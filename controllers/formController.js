const ErrorHandler = require("../utils/errorHandler.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const {sendResponseEmail} = require('../utils/emailNotifier.js')

const catchAsyncError = require("../middleware/catchAsyncError.js");

const Forms = require("../models/forms")
const Question = require("../models/questions");

// Create a form
exports.createForm = catchAsyncError(async (req, res, next) => {
  const { formName ,questions} = req.body; // Assuming the new form name is sent in the request body

  // Only allow admin to create a form
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ success: false, error: 'Permission denied' });
  }

  // Check if the new form name  and questions are provided
  if (!formName) {
    return next(new ErrorHandler('Please provide a form name', 400));
  }
  if (!questions) {
    return next(new ErrorHandler('Please provide a question', 400));
  }

  // Create a new form using the Form model
  const newQuestions = await Question.insertMany(questions);
  const newForm = new Forms({ formName ,newQuestions});
  const savedForm = await newForm.save();
  
  // notify admin that form has been created
  await sendResponseEmail(req.user.email, "Form has been created for users");

  var users = []
  users = findUsers(req.user.email)

  users.forEach (email => {
    sendResponseEmail(email, "New Form has been created!! Submit response!");
  });

  res.status(201).json({ success: true, form: savedForm });
});

// Get All Forms
exports.getAllForms = catchAsyncError(async (req, res ) => {

    const alumniCount = await Forms.countDocuments();
  
    const apiFeatures = new ApiFeatures(Forms.find(), req.query)
      .search()
      .filter();
    const Forms = await apiFeatures.query;
    res.status(200).json({
      success: true,
      alumni,
      alumniCount,
    });
});

// see all responses for a form
exports.checkResponse = catchAsyncError(async(req,res,next)=>{
  const responseId = req.params.id;
  try{
    // Find the response by its ID
    const gotResponse = await Forms.findById(responseId);

    if (!gotResponse) {
      return next(new ErrorHandler('Response not found', 404));
    }

    const responses = gotResponse.responses

    res.status(200).json({ success: true, responses });

  }catch(error){
    next(error);
  }
})

exports.submitEvaluation = catchAsyncError(async(req,res,next)=>{
  const responseId = req.params.id;
  const userId = req.params.userId;
  const eval = req.body.eval;
  try{
    // Find the response by its ID
    const gotResponse = await Forms.findById(responseId);

    if (!gotResponse) {
      return next(new ErrorHandler('Response not found', 404));
    }

    // update the evaluation sent by the admin
    const user = User.findByIdAndUpdate(userId,{
      evaluation : eval
    });
    
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({ success: true});

  }catch(error){
    next(error);
  }
})

//Get Form Details
exports.getFormDetail = catchAsyncError(async (req, res, next) => {

  // Only allow admin to create a form
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Permission denied' });
  }

    const form = await Forms.findById(req.params.id);
  
    if (!form) {
      return next(new ErrorHandler("Form not found", 404));
    }
  
    res.status(200).json({ success: true, form });
});

//Update Form Details
exports.updateFormDetail = catchAsyncError(async (req, res, next) => {

  // Only allow admin to create a form
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Permission denied' });
  }

  const formId = req.params.id;
  const updatedFormName = req.body.formName; 
 
  if (!updatedFormName) {
    return next(new ErrorHandler('Please provide a valid form name', 400));
  }

  // Find the form by its ID and update the formName
  const form = await Forms.findByIdAndUpdate(
    formId,
    { formName: updatedFormName },
  );

  if (!form) {
    return next(new ErrorHandler('Form not found', 404));
  }

  res.status(200).json({ success: true, form });
});


// Delete Form
exports.deleteForm = catchAsyncError(async (req, res, next) => {
  
  // Only allow admin to create a form
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Permission denied' });
  }

  const formId = req.params.id;

  // Find the form by its ID and delete it
  const deletedForm = await Forms.findByIdAndDelete(formId);

  if (!deletedForm) {
    return next(new ErrorHandler('Form not found', 404));
  }

  res.status(200).json({ success: true, message: 'Form deleted successfully' });
});

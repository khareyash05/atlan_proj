const Forms = require("../models/forms")
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

// Create a form
exports.createForm = catchAsyncError(async (req, res, next) => {
  const { formName } = req.body; // Assuming the new form name is sent in the request body

  // Check if the new form name is provided
  if (!formName) {
    return next(new ErrorHandler('Please provide a form name', 400));
  }

  // Create a new form using the Form model
  const newForm = new Forms({ formName });
  const savedForm = await newForm.save();

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

//Get Form Details
exports.getFormDetail = catchAsyncError(async (req, res, next) => {
    const form = await Forms.findById(req.params.id);
  
    if (!form) {
      return next(new ErrorHandler("Form not found", 404));
    }
  
    res.status(200).json({ success: true, form });
});

//Update Form Details
exports.updateFormDetail = catchAsyncError(async (req, res, next) => {
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
  const formId = req.params.id;

  // Find the form by its ID and delete it
  const deletedForm = await Forms.findByIdAndDelete(formId);

  if (!deletedForm) {
    return next(new ErrorHandler('Form not found', 404));
  }

  res.status(200).json({ success: true, message: 'Form deleted successfully' });
});

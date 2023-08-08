const ErrorHandler = require("../utils/errorHandler.js");
const {
  getAdminEmail,
  sendResponseEmail
} = require('../utils/emailNotifier.js')

const catchAsyncError = require("../middleware/catchAsyncError.js");

const Form = require("../models/forms")
const Response = require("../models/responses")
const User = require("../models/user");
const Answer = require("../models/answers.js");

// Controller function to create a new response
exports.createResponse = catchAsyncError(async (req, res, next) => {
  const { formId, answers } = req.body;
  const {userId} = req.user.id;

  try {
    // Check if the form exists
    const form = await Form.findById(formId);

    if (!form) {
      return next(new ErrorHandler('Form not found', 404));
    }

    // Create the response
    await Answer.insertMany(answers)
    const response = await Response.create({
      formId,
      answers,
      timeStamp : new Date.now(),
      userId : userId
    });

    // Search for admin's Id pertaining to the user
    currentUser = await User.findById(userId)
    adminId = currentUser.admin

    // Get admin's email by admin ID
    const adminEmail = await getAdminEmail(adminId);

    // Send an email to the admin with the response details when successful
    await sendResponseEmail(adminEmail, response);

    // Send a copy of responses to user's email id(as a receipt of the work done)
    await sendResponseEmail(currentUser.email, response);

    res.status(201).json({ success: true, response });
  } catch (error) {
    next(error);
  }
});

// Controller function to delete a response
exports.deleteResponse = catchAsyncError(async (req, res, next) => {
  const responseId = req.params.id;

  try {
    // Find the response by its ID and delete it
    const deletedResponse = await Response.findByIdAndDelete(responseId);

    if (!deletedResponse) {
      return next(new ErrorHandler('Response not found', 404));
    }

    res.status(200).json({ success: true, message: 'Response deleted successfully' });
  } catch (error) {
    next(error);
  }
});

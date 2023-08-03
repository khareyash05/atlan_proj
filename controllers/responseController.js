const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");

const Form = require("../models/forms")
const Response = require("../models/responses")

const keys = require('../config/keys')
const { sheets } = keys;

// Controller function to create a new response
exports.createResponse = catchAsyncError(async (req, res, next) => {
  const { formId, answers } = req.body;

  try {
    // Check if the form exists
    const form = await Form.findById(formId);

    if (!form) {
      return next(new ErrorHandler('Form not found', 404));
    }

    // Create the response
    const response = await Response.create({
      formId,
      answers,
    });

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

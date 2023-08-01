const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

const Question = require('../models/questions');

// Controller function to create a new question
exports.createQuestion = catchAsyncError(async (req, res, next) => {
  const { questionText, questionType, metadata } = req.body;

  try {
    // Create the question
    const question = await Question.create({
      questionText,
      questionType,
      metadata,
    });

    res.status(201).json({ success: true, question });
  } catch (error) {
    next(error);
  }
});

// Controller function to update a question
exports.updateQuestion = catchAsyncError(async (req, res, next) => {
  const questionId = req.params.id;
  const { questionText, questionType, metadata } = req.body;

  try {
    // Find the question by its ID and update its details
    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        questionText,
        questionType,
        metadata,
      },
      { new: true }
    );

    if (!question) {
      return next(new ErrorHandler('Question not found', 404));
    }

    res.status(200).json({ success: true, question });
  } catch (error) {
    next(error);
  }
});

// Controller function to delete a question
exports.deleteQuestion = catchAsyncError(async (req, res, next) => {
  const questionId = req.params.id;

  try {
    // Find the question by its ID and delete it
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return next(new ErrorHandler('Question not found', 404));
    }

    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    next(error);
  }
});

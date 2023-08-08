const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

const Response = require("../models/responses")
const Question = require("../models/questions")
const Answer = require("../models/answers")

// Controller function to create a new answer
exports.createAnswer = catchAsyncError(async (req, res, next) => {
  const { responseId, questionId, answerValue, metadata } = req.body;

  try {
    // Check if the response and question exist
    const response = await Response.findById(responseId);
    const question = await Question.findById(questionId);

    if (!response || !question) {
      return next(new ErrorHandler('Response or Question not found', 404));
    }

    // Create the answer
    const answer = await Answer.create({
      responseId,
      questionId,
      answerValue,
      metadata,
    });

    res.status(201).json({ success: true, answer });
  } catch (error) {
    next(error);
  }
});

// Controller function to update an answer
exports.updateAnswer = catchAsyncError(async (req, res, next) => {
  const answerId = req.params.id;
  const { answerValue, metadata } = req.body;

  try {
    // Find the answer by its ID and update its details
    const answer = await Answer.findByIdAndUpdate(
      answerId,
      {
        answerValue,
        metadata,
      },
      { new: true }
    );

    if (!answer) {
      return next(new ErrorHandler('Answer not found', 404));
    }

    res.status(200).json({ success: true, answer });
  } catch (error) {
    next(error);
  }
});

// Controller function to delete an answer
exports.deleteAnswer = catchAsyncError(async (req, res, next) => {
  const answerId = req.params.id;

  try {
    // Find the answer by its ID and delete it
    const deletedAnswer = await Answer.findByIdAndDelete(answerId);

    if (!deletedAnswer) {
      return next(new ErrorHandler('Answer not found', 404));
    }

    res.status(200).json({ success: true, message: 'Answer deleted successfully' });
  } catch (error) {
    next(error);
  }
});

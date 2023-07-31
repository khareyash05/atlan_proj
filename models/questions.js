// Require Mongoose
const mongoose = require('mongoose');

// Define the Question schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['text', 'multiple-choice', 'numeric'], // Example question types
    required: true,
  },
});

// Create and export the Question model
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

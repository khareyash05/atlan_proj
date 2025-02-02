const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['multiple-choice'],
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

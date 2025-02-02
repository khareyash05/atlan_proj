const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  answerValue: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  responses : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Response',
    },
  ]
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;

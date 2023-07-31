// Require Mongoose
const mongoose = require('mongoose');

// Define the Form schema
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
});

// Create and export the Form model
const Form = mongoose.model('Form', formSchema);
module.exports = Form;

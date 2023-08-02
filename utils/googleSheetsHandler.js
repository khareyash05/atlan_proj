const sheets = require('../config/googleapis');

const Form  = require('../models/forms')
const Answers = require('../models/answers');

// Function to append a new row to the Google Sheet for each response
async function appendResponseToSheet(spreadsheetId, sheetName, response) {
  try {
    const values = [];

    // Extract answers from the response
    const { formId, answers } = response;

    // Fetch the Form and its questions to map question IDs to column indexes
    const Form = await Form.findById(formId).populate('questions');
    const questionIdsToColumns = new Map();
    Form.questions.forEach((question, index) => {
      questionIdsToColumns.set(question._id.toString(), index);
    });

    // Prepare the row data for the response
    Form.questions.forEach((question) => {
      const answer = Answers.find((ans) => ans.questionId === question._id.toString());
      values.push(answer ? answer.answerValue : '');
    });

    // Append the row data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:A`, // Assuming you want to append the row to the first column (A)
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [values],
      },
    });

    console.log('Response appended to Google Sheet successfully!');
  } catch (error) {
    console.error('Error appending response to Google Sheet:', error.message);
  }
}

module.exports = {
  appendResponseToSheet,
};

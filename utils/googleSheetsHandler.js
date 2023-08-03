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
      range: `${sheetName}!A:A`,
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

// Function to fetch data from Google Sheets for creating a graph
async function fetchDataForGraph(spreadsheetId, sheetName) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No data found.');
    }

    const labels = values[0];
    const datasets = [];

    for (let i = 1; i < values.length; i++) {
      const rowData = values[i];
      const dataset = {
        label: `Response ${i}`,
        data: rowData.map((value) => Number(value)), // Convert data to numbers if needed
        backgroundColor: getRandomColor(), // Generate random colors for the dataset
      };
      datasets.push(dataset);
    }

    return { labels, datasets };
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error.message);
    throw error;
  }
}

// Helper function to generate random colors
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


module.exports = {
  appendResponseToSheet,
  fetchDataForGraph
};

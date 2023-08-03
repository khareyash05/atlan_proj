const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");

const {
    appendResponseToSheet,
    fetchDataForGraph
} = require("../utils/googleSheetsHandler.js");

exports.integrateSheets = catchAsyncError(async ( req,res,next)=>{
  try {
    const responseId = req.params.id;
    const response = await Response.findById(responseId).populate('answers');

    if (!response) {
      return next(new ErrorHandler('Response not found', 404));
    }

    // Call the function to append the response to the Google Sheet
    await appendResponseToSheet(sheets.url, sheets.name, response);

    res.status(200).json({ success: true, message: 'Response integrated with Google Sheets successfully' });
  } catch (error) {
    next(error);
  }
})

exports.generateGraph = catchAsyncError(async (req, res, next)=> {
  try {
    const spreadsheetId = sheets.url;
    const sheetName = sheets.name;

    // Fetch data from Google Sheets
    const data = await fetchDataForGraph(spreadsheetId, sheetName);

    // Process the data as needed to create the graph using Chart.js
    const labels = data[0]; 
    const datasets = [];

    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const dataset = {
        label: `Response ${i}`,
        data: rowData.map((value) => Number(value)),
        backgroundColor: getRandomColor(),
      };
      datasets.push(dataset);
    }

    // Create the chart data object
    const chartData = {
      labels: labels,
      datasets: datasets,
    };

    // Return the chart data as JSON response
    res.status(200).json({ success: true, data: chartData });
  } catch (error) {
    console.error('Error generating graph:', error.message);
    res.status(500).json({ success: false, error: 'Error generating graph' });
  }
})

// Helper function to generate random colors
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const { google } = require('googleapis');
const { credentials } = require('../client_secret_86666038436-mqhhrsr76l3d4eeuel0s4jqp5d6kqvpk.apps.googleusercontent.com.json'); 

// Set up the Google Sheets API client
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets
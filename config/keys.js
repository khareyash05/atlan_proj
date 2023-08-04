require('dotenv').config();
module.exports = {
    app: {
      name: 'Form Controller',
      apiURL: `${process.env.BASE_API_URL}`,
      serverURL: process.env.BASE_SERVER_URL,
      clientURL: process.env.BASE_CLIENT_URL
    },
    port: process.env.PORT || 5000,
    database: {
      url: process.env.DB
    },
    sheets :{
      url : process.env.SHEET_URL,
      name : process.env.SHEET_NAME
    },
    emailNotify : {
      from : process.env.EMAIL_FROM,
      key : process.env.EMAIL_NOTIFY_KEY
    }
}
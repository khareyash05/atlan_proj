const sgMail = require('@sendgrid/mail');

const Admin = require('../models/forms')
const keys = require('../config/keys');
const { EMAIL_NOTIFY_KEY,EMAIL_FROM } = keys.emailNotify;
sgMail.setApiKey(EMAIL_NOTIFY_KEY);

// Function to send an email to the admin
async function sendResponseEmail(adminEmail, responseDetails) {
  const msg = {
    to: adminEmail,
    from: EMAIL_FROM, 
    subject: 'New Response Submitted',
    text: `A new response has been submitted.\n\nResponse Details:\n${JSON.stringify(responseDetails, null, 2)}`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function getAdminEmail(adminId){
  gotAdmin = await Admin.findOne(adminId)
  return gotAdmin.email
}

async function getUsers(adminId){
  admins = await Admin.findOne(adminId)
  return admins.users
}

module.exports = {
  sendResponseEmail,
  getAdminEmail,
  getUsers
};

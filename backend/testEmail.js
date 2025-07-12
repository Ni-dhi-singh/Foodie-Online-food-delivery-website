require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

sendEmail(
  "23nidheesingh@gmail.com", 
  "Test Email from Foodie..", 
  "<h1>Hello Nidhi 👋</h1><p>This is a test email from your project.</p>"
);

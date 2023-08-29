if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const schedule = require("node-schedule");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.to = [
  { email: process.env.BREVO_EMAIL_TO, name: process.env.BREVO_NAME_TO },
];
sendSmtpEmail.bcc = [
  { email: process.env.BREVO_EMAIL_BCC, name: process.env.BREVO_NAME_BCC },
];
sendSmtpEmail.templateId = process.env.BREVO_TEMPLATE_ID;

function sendEmail() {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
}
const recurrence = process.env.BREVO_RECURRENCE;
const job = schedule.scheduleJob(recurrence, function() {
  sendEmail();
});

module.exports = job;

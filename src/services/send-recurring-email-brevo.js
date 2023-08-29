const { environments } = require('../config/environments');
const schedule = require("node-schedule");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = environments.brevoApiKey;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.to = [
  { email: environments.brevoEmailTo, name: environments.brevoNameTo },
];
sendSmtpEmail.bcc = [
  { email: environments.brevoEmailBcc, name: environments.brevoNameBcc },
];
sendSmtpEmail.templateId = environments.brevoTemplateId;

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
const recurrence = environments.brevoRecurrence;
const job = schedule.scheduleJob(recurrence, function() {
  sendEmail();
});

module.exports = job;

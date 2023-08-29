if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const environments = {
  brevoApiKey: process.env.BREVO_API_KEY,
  brevoEmailTo: process.env.BREVO_EMAIL_TO,
  brevoEmailBcc: process.env.BREVO_EMAIL_BCC,
  brevoNameTo: process.env.BREVO_NAME_TO,
  brevoNameBcc: process.env.BREVO_NAME_BCC,
  brevoTemplateId: parseInt(process.env.BREVO_TEMPLATE_ID),
  brevoRecurrenceHour: parseInt(process.env.BREVO_RECURRENCE_HOUR),
  brevoRecurrenceMinute: parseInt(process.env.BREVO_RECURRENCE_MINUTE),
};

module.exports = { environments };

const service = require("./src/services/send-recurring-email-brevo");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const whitelist = ["http://localhost:3000"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Access"));
    }
  },
};
app.use(cors(options));
app.listen(port, () => {
  console.log("Listening on port => " + port);
});

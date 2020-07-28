const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require('express')
const app = express();
const db = mongoose.connection;

mongoose
  .connect("mongodb://localhost/ninjago", { useNewUrlParser: true })
  .then(() => console.log("DB Connected!"));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use("/api", require("./routes/userController"));

app.listen(process.env.port || 3000, function () {
  console.log("Node server is running..");
});

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
// app.use("/api", require("./routes/api"));
app.use("/api", require("./routes/userController"));
//error handling middleware
app.use(function(err,req,res,next){
  // console.log(err)
  res.status(422).send({error: err._message})
})
app.listen(process.env.port || 3000, function () {
  console.log("Node server is running..");
});

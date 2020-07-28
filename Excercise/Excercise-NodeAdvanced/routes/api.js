const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

//get list from database
router.get("/ninjas", function (req, res, next) {
  Ninja.find({}).then(ninja =>{
    res.send({ ninja });
  })
});

//add new into database
router.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja);
    })
    .catch(next);
});

//update one in database
router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Ninja.findById({ _id: req.params.id }).then((ninja) => {
        res.send(ninja);
      });
    })
    .catch(next);
});

//delete one in database
router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then((ninja) => {
      res.send(ninja);
    })
    .catch(next);
});

module.exports = router;

const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
      req.token = authHeader.split(" ")[1];
      jwt.verify(req.token, process.env.TOKEN_ACCESS, (err, authData) => {
        if (err) {
            res.status(403).send(err)
        }
        else {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
module.exports = {
    verifyAccessToken: verifyAccessToken
  };

import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
let generateToken = (data, expriredTime, callback) => {
  jwt.sign({data}, process.env.TOKEN_ACCESS, { expiresIn: expriredTime }, (err, token) => {
    if (err) {
      callback ({"error": true , "data": err});
    } else {
      callback( {"error": false, "data": token });
    }
  });
};
export {generateToken}
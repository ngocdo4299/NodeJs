import jwt from "jsonwebtoken";
import crypto from 'crypto'

export const generateToken = async (data, expriredTime) => {
  const result = await jwt.sign({data}, process.env.TOKEN_ACCESS, { expiresIn: expriredTime } )
  return result
};

export const generateResetToken = () => {
  const tokenLength = 8
  let expriredTime = new Date;
  expriredTime.setMinutes(expriredTime.getMinutes()+10)
  return {
    resetToken: crypto.randomBytes(Math.ceil(tokenLength/2)).toString('hex').slice(0,tokenLength),
    resetTokenExpired: expriredTime
  }
};
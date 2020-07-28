const jwt = require("jsonwebtoken");

function generateAccessToken(username){
    return jwt.sign(username, ACCESS_TOKEN_SECRET, { algorithm: 'RS256'});
}

function verifyAccessToken(req,res,user,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err)
            return res.sendStatus(403)
        req.user = user
        next()
    })
}
module.exports = {
    generateAccessToken: generateAccessToken,
    verifyAccessToken: verifyAccessToken
  };

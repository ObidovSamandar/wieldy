const jwt = require('jsonwebtoken')
const configs = require('../config/configs')
function signToken(payload){
    return jwt.sign(payload,configs.JWT_SECRET_WORD)
}


function verifyToken(token){
    return jwt.verify(token,configs.JWT_SECRET_WORD)
}

module.exports ={
    signToken,
    verifyToken
}
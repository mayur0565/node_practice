const jwt = require('jsonwebtoken')
require('dotenv').config()
const {ErrorHandler} = require('../utils/errorHandler')

module.exports.generateJwt = function(req,res,next){
return jwt.sign({data:"ghdg"},process.env.SECRET_KEY,{ expiresIn:'5min'})
}

module.exports.verifyJwt = function(req,res,next){
    
   const token = req.cookie
   console.log(token);
   if(!token)
   return next(new ErrorHandler('unauthonticate user',400))

   jwt.verify(jwtToken,process.env.SECRET_KEY)
   next()
}   

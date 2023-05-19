const userModel = require("../model/userModel");
const {isUserExist,PasswordMatch,generateOtp} = require('../common/commonFunctons')
const {ErrorHandler} = require('../utils/errorHandler')
const {catchAsyncError} = require('../middleware/catchAsyncError')
const {generateJwt} = require('../common/jwtHelper')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {sendmail} = require('../common/emailHelper')
module.exports.register = catchAsyncError(async function (req, res, next) {
   const request = req.body;

   if(!request.full_name || !request.email || !request.password)
   return next(new ErrorHandler("Please provide all fields", 400));

  const isExist = await isUserExist(request.email)
  if(isExist.length > 0)
  return next(new ErrorHandler('user already exist'))
       
   userModel.register(request.full_name, request.email, request.password);
   res.status(200).json({
     status : 1,
     message : 'user registered successfully'
   })
         
}
)

module.exports.login = catchAsyncError(async function (req, res, next) {
  const response = {}
  const request = req.body;

  if(!request.email || !request.password)
  return next(new ErrorHandler("please provide all fields",401))
  
  const userData = await isUserExist(request.email)

  if(userData.length == 0)
  return next(new ErrorHandler("user not register with this email",404))


  const isPassMatch = await PasswordMatch(request.email,request.password)
  if(!isPassMatch)
  return next(new ErrorHandler("invalid email or password"))
  let token = generateJwt()
  console.log(token);

  res.cookie("token",token,{ domain: 'localhost',
    expire: 1 / 24,
    path: '/',
    httpOnly: true, 
    secure: true });
  res.send({"token":token})
})


module.exports.logout = catchAsyncError(async function(req,res,next){
res.status(200).cookie("token",null,{expires: new Date(Date.now())}).json({
  message : 'logout successfully'
})
}) 

module.exports.forgotPassword = catchAsyncError(async function(req,res,next){
      
  const {email,user_id} = req.body
  if(!email)
  return next(new ErrorHandler('please provide all fields",401'))

  const otp =await generateOtp()
  console.log(otp);
  sendmail(email,otp)
  

}) 
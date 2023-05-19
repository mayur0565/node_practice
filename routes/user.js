const express = require('express')
const router = express.Router()
const {verifyJwt} = require('../common/jwtHelper')
const userController = require('../controller/userController')

router.post('/register',(req,res,next)=>{
    userController.register(req,res,next)
})

router.post('/login',(req,res,next)=>{
    userController.login(req,res,next)
})

router.get('/home',verifyJwt,(req,res,next)=>{
   res.send("welcome to dashboard")
})

router.post('/logout',(req,res)=>{
    userController.logout(req,res)
})


router.post('/forgot_password',(req,res)=>{
    userController.forgotPassword(req,res)
})

router.post('/reset_password',(req,res)=>{
    userController.resetPassword(req,res)
})

module.exports = router
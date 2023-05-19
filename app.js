const express = require('express')
const app = express()
const {ErrorMiddleware} = require('./middleware/Error')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
app.use(express.json())

app.use('/user',userRoute)
app.use(cookieParser())

app.use(ErrorMiddleware)
module.exports = app          
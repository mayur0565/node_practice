
const nodemailer = require('nodemailer')

module.exports.sendmail =async function(usermail,otp){

    let transporter = nodemailer.createTransport({
        port: 587,
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
          user:'mayurdemo565@gmail.com', // generated ethereal user
          pass: 'cpibebznhkgxknoz', // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '<mayurdemo565@gmail.com>', // sender address
        to: `${usermail}`, // list of receivers
        subject: "Forgot password ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `your password reset otp is <b>${otp}</b>`, // html body
      });
}

const connection = require("../common/db_connection")
const bcrypt = require('bcrypt')

module.exports.isUserExist = async function (email){
    const sql = "select * from tb_users where email = ?"
    return await connection.executeQuery(sql,[email])
}

module.exports.PasswordMatch = async function(email,password){
    let userPassword = ''
    const sql = "select password from tb_users where email = ?"
    const result = await connection.executeQuery(sql,email)
    userPassword = result[0].password
    let ismatch = await bcrypt.compare(password,userPassword)
    return ismatch
}

module.exports.generateOtp = async  function(){
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
}
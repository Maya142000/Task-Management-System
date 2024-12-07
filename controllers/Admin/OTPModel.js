const mongoose = require("mongoose")

const OTPSchema = new mongoose.Schema({
    OTP : {
        type : Number,
        default : 0
    }

}, {timestamps : true} )

module.exports = mongoose.model('UserOTP', OTPSchema);
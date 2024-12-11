const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    FirstName : {
        type : String,
        default : "",
        required : true
    },
    LastName : {
        type : String,
        default : "",
        required : true
    },
    FullName : {
        type : String,
        default : "",
        required : true
    },
    Email : {
        type : String,
        default : "",
        required : true
    },
    OTP : {
        type : Number,
        default : 0
    },
    Password : {
        type : String,
        default : "",
        required : true
    },
    // Confirm_Password : {
    //     type : String,
    //     default : ""
    // }
    UserID : {
        type : Number,
        default : 0
    },
    // UserName : {
    //     type : String,
    //     default : ""
    // }

}, {timestamps : true} )

module.exports = mongoose.model('User_Data', UserSchema);
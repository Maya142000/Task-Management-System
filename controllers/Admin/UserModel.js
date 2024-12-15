const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
    Password : {
        type : String,
        default : "",
        required : true
    },
    UserID : {
        type : Number,
        default : 0
    },
    User : {
        type : String,
        default : "",
        required : true
    },

}, {timestamps : true} )

module.exports = mongoose.model('User_Data', UserSchema);
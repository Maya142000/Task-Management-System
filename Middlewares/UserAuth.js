const UserModel = require("../controllers/Admin/UserModel")
const {emailValidator} = require("../Utils/EmailValidator")
const {PasswordValidator} = require("../Utils/PasswordValidator")
const bcrypt = require("bcryptjs");

module.exports = { 
    authRegister :  async (req,res,next) => {
        try {
            const NewData = req.body

            const existingUser = await UserModel.findOne({ Email: NewData.Email }).exec();
            if (!existingUser) return res.send({ status: 401, success: false, message: "User Already Exist...!" });

            if (!NewData.FirstName) {
                res.send({ status : false, message : "Please provide your first Name..!" })
            }

            if (!NewData.LastName) {
                res.send({ status : false, message : "Please provide your Last Name..!" })
            }

            if (!NewData.Email) {
                res.send({ status : false, message : "Please enter your Email..!" })
            }

            if (!NewData.OTP) {
                return res.send({ status : false, message : "Please enter your OTP..!" })
            }

            if (!NewData.Password) {
                return res.send({ status : false, message : "Please enter your Password..!" })
            }

            try {

                emailValidator(NewData.Email);
                PasswordValidator(NewData.Password);

            } catch (error) {
                return res.send({
                    status : 400,
                    success: false,
                    error : error.message
                })
            }
            next();
            
        } catch (error) {
            if (!res.headersSent) {
                return res.status(500).json({
                    status : false,
                    message : "Internal Server error..!",
                    error : error.message
                })
            }
        }
    },



    authlogin : async (req, res, next) => {
        try {
            const { Email, Password } = req.body;
            
            if (!Email || !Password) return res.send({ status: 400, success: false, message: "Please provide your Email and Password to proceed..!" });

            if (!Email) return res.send({ status: 400, success: false, message: "Please enter your Email..!" });
            if (!Password) return res.send({ status: 400, success: false, message: "Please enter your Password..!" });
            
            const existingUser = await UserModel.findOne({ Email: Email }).exec();
            if (!existingUser) return res.send({ status: 401, success: false, message: "To continue, please sign up first." });
            
            const PasswordMatch = await bcrypt.compare(Password, existingUser.Password);

            if (PasswordMatch) {
                next();
            } else {
                return res.send({  status: 401,  success: false,  message: "Oops..!, Wrong Password." });
            }
        } catch (error) {
            res.send({ 
                status: false, 
                message: 'Internal Server error..!', 
                error: error.message 
            });
        }
    },


    authChangePassword : async (req, res, next) => {
        try {
            const { Password, Email }  = req.body

            const existingUser = await UserModel.findOne({ Email: Email }).exec();
            if (!existingUser) return res.send({ status: 401, success: false, message: "Please enter your Email..!" });

            try {
                PasswordValidator(Password);
            } catch (error) {
                return res.send({
                    status : 400,
                    success: false,
                    error : error.message
                })
            }
            next();
            
        } catch (error) {
            return res.send({
                status : false,
                message : "Internal Server error..!",
                error : error.message
            })
        }
    }
    

};
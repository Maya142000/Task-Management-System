const express = require("express")
const router = express.Router();

const UserController = require("../Admin/Usercontroller")
const UserAuth = require("../../Middlewares/UserAuth")

router.post("/CreateOTP", UserController.CreateOTP);
router.post("/Register", UserAuth.authRegister, UserController.Register);
router.post("/loginUser", UserAuth.authlogin, UserController.loginUser);
router.post("/Update", UserAuth.authChangePassword, UserController.Update);
router.post("/verifyOTP", UserController.verifyOTP);

module.exports = router
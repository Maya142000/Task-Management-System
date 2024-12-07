const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const UserModel = require("./UserModel");
const OTPModel = require("./OTPModel");

module.exports = {

  // OTP API----->
  CreateOTP: async (req, res) => {
    try {
      const Data = req.body;
      const NewData = { ...Data };

      const otp = Math.floor(100000 + Math.random() * 900000);

      const otpcreate = new OTPModel({ OTP: otp,});
      await otpcreate.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: NewData.Email,
        subject: "Your OTP Code",
        text: `Hello Dear,\n\nYour OTP code is ${otp}. It will expire in 10 minutes.\n\nThank you!`,
      };

      await transporter.sendMail(mailOptions);

      return res.send({
        status: true,
        message: "OTP has been sent to your email.",
        Data: otpcreate,
      });
    } catch (error) {
      return res.send({
        status: false,
        message: "Unable to generate OTP; please try again.",
        error: error.message,
      });
    }
  },



  // Register API------->
  Register: async (req, res) => {
    try {
      const Data = req.body;
      const NewData = { ...Data };

      // const existingUser = await OTPModel.findOne({ $and : [{ Email: NewData.Email }] });
      // if (!existingUser) {
      //   return res.send({ status: false, message: "You’re already Registered, Please Sign in..!" });
      // }

      const verifiedOTP = await OTPModel.findOne({ $and : [{ _id: NewData.id }, { OTP: NewData.OTP }] });
      if (!verifiedOTP) {
        return res.send({ status: false, message: "Please enter a valid OTP.....!" });
      }

      const hashedPassword = await bcrypt.hash(NewData.Password, 10);

      const Usercreate = new UserModel({
        FirstName: NewData.FirstName,
        LastName: NewData.LastName,
        FullName: `${NewData.FirstName} ${NewData.LastName}`,
        Email: NewData.Email,
        OTP: NewData.OTP,
        Password: hashedPassword,
        // Confirm_Password: hashedPassword
      });
      await Usercreate.save();

      await OTPModel.deleteOne({ _id: NewData.id });

      return res.send({
        status: true,
        message: "You have registered successfully...!",
        Data: Usercreate,
    });
    next();

    } catch (error) {
    if (!res.headersSent) {
      return res.status(500).send({
          status: false,
          message: "Failed to Register, please try again later...!",
          error: error.message,
        });
      }
    }
  },



// Login API---->
loginUser: async (req, res, next) => {
    try {
      const { Email, Password } = req.body;

      const existingUser = await UserModel.findOne({ Email: Email }).exec();
      if (!existingUser) {
        return res.send({ status: 401, success: false, message: "To continue, please sign up first." });
      }

      const PasswordMatch = await bcrypt.compare( Password, existingUser.Password );

      if (PasswordMatch) {
        const token = jwt.sign({ _id: existingUser._id }, SECRET_KEY, {
          expiresIn: "15m",
      });
        return res.send({
          status: true,
          message: "Welcome..!, You've logged in successfully.",
          Token: token,
          ExistingUser: existingUser,
        });
      } else {
        return res.send({
          status: false,
          message: "Oops..!, Wrong Email or Password.",
        });
      }
    } catch (error) {
        return res.send({
          status: false,
          message: "Error in Try",
          error: error.message,
        });
      }
    },
  };

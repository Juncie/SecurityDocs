const User = require("../models/User");
const ErrorResponse = require('../utils/errorRes')


exports.register = async (req, res, next) => {
  const { first, last, userId, role, location, password, email } = req.body;
  try {
    const user = await User.create({ 
      first, last, userId, role, location, password, email
    });
    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error: error.message
    })
  }
};

exports.login = async (req, res, next) => {
  const {userId, password} = req.body;

  if(!userId || !password){
    // return next(new ErrorResponse("Please provide a User ID & Password", 400))
    res.status(400).json({success: false, error: "Please provide User ID & Password"})
  }
    try {
    const user = await User.findOne({userId}).select("+password")
    
    if (!user){
      return next(new ErrorResponse("Invalid Credentials", 404))
    }

    const isMatch = await user.matchPasswords(password);  
    
    if (!isMatch){
      return next(new ErrorResponse("Invalid Credentials", 404))
    }
    sendToken(user, 200, res)
  } 
    catch (error) { 
      res.status(500).json({success: false, error: error.message})
    } 
  }


exports.forgotPassword = (req, res, next) => {
    res.json('Forgot Password Route')
}

exports.resetPassword = (req, res, next) => {
    res.json('Reset Password Route')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({success: true, token})
}
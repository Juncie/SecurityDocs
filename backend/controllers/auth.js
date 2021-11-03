const User = require("../models/User");
const ErrorResponse = require('../utils/errorRes')



exports.register = async (req, res, next) => {
  const { first, last, userId, role, location, password } = req.body;
  
  try {
    const user = await User.create({ first, last, userId, role, location, password});
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error)
  }
  res.json('Register Route');
};

exports.login = async (req, res, next) => {
  const {userId, password} = req.body;

  if(!userId || !password){
    return next(new ErrorResponse("Please provide a User ID & Password", 400))
  
    try {
    const user = await User.findOneAndRemove({userId}).select("+password")
    
    if (!user){return next(new ErrorResponse("Please provide a User ID & Password", 404))}

    const isMatch = await user.matchPasswords(password);  
    
    if (!isMatch){return next(new ErrorResponse("Invalid Credentials", 401))}
      
    res
      .status(200)
      .json({ success: true, token: "yololooo" })
    } 
    catch (error) { next(error) }
  }
}

exports.forgotPassword = (req, res, next) => {
    res.json('Forgot Password Route')
}

exports.resetPassword = (req, res, next) => {
    res.json('Reset Password Route')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
}
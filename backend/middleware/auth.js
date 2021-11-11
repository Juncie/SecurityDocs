const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorRes");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (!err) {
        res.locals.user = data.user;
        next();
      } else {
        res.status(403).json({ success: false, message: err });
      }
    });
  } else {
    res.status(403).json({ message: "Must be logged in!" });
  }
};
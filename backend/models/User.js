const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const roles = ["Manager", "manager", "Admin", "admin", "User", "user"];
const locations = ["Wittmann", "wittmann", "Mesa", "mesa", "Tempe", "tempe"];

const userSchema = new Schema({
  first: { type: String, required: [true, "Please enter a first name"] },
  last: { type: String, required: [true, "Please enter a last name"] },
  email: { 
    type: String, 
    required: [true, "Please enter your email"] },
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please provide a valid email",
    // ],
  userId: { type: Number, unique: [true, "User Already Exists"], required: [true, "Please insert a UserID"] },
  role: { type: String, enum: roles, required: [true, "Please select a role"] },
  location: { type: String, enum: locations, required: [true, "Please enter a location"] },
  password: { type: String, required: [true, "Please add a password"], minlength: 6, select: false },
  resetPasswordToken: String,
  resetPasswordExpore: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = model("User", userSchema);

module.exports = User;
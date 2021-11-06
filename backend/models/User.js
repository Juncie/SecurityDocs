const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const roles = ["Manager", "manager", "Admin", "admin", "User", "user"];
const locations = ["Wittmann", "wittmann", "Mesa", "mesa", "Tempe", "tempe"];

const userSchema = new Schema({
  first: { type: String, required: [true, "Please enter a first name"] },
  last: { type: String, required: [true, "Please enter a last name"] },
  email: { type: String, required: [true, "Please enter your email"] },
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

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this.userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

module.exports = model("User", userSchema);

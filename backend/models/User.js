const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const roles = ['Manager', 'manager', 'Admin', 'admin', 'User', 'user'];
const locations = ['Wittmann', 'wittmann', 'Mesa', 'mesa', 'Tempe', 'tempe'];

const userSchema = new Schema(
	{
		first: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
			minlength: [2, 'First name must be at least 2 characters'],
			maxlength: [20, 'First name must be less than 20 characters'],
		},
		last: {
			type: String,
			required: [true, 'Last name is required'],
			trim: true,
			minlength: [2, 'Last name must be at least 2 characters'],
			maxlength: [20, 'Last name must be less than 20 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			trim: true,
			minlength: [5, 'Email must be at least 5 characters'],
			maxlength: [50, 'Email must be less than 50 characters'],
			validate: {
				validator: function (email) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
				},
				message: 'Email is not valid',
			},
		},
		userId: {
			type: Number,
			required: [true, 'User ID is required'],
			unique: true,
			trim: true,
			minlength: [5, 'User ID must be at least 5 characters'],
			maxlength: [50, 'User ID must be less than 50 characters'],
			validate: {
				validator: function (userId) {
					return /^[0-9]+$/.test(userId);
				},
				message: 'User ID is not valid',
			},
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [8, 'Password must be at least 8 characters'],
			maxlength: [50, 'Password must be less than 50 characters'],
		},
		role: {
			type: String,
			required: [true, 'Role is required'],
			enum: roles,
			default: 'user',
		},
		location: {
			type: String,
			required: [true, 'Location is required'],
			enum: locations,
		},
		resetToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
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
	const privateKey = process.env.JWT_SECRET;
	const expiresIn = process.env.JWT_EXPIRE;
	return jwt.sign({ id: this._id }, privateKey, { expiresIn: expiresIn });
};

userSchema.methods.getResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 15 * (60 * 1000); //15 minutes
	return resetToken;
};

const User = model('User', userSchema);

module.exports = User;

const { Schema, model } = require('mongoose');

const sarSchema = new Schema(
	{
		userId: { type: Number, required: [true, 'User ID is required'] },
		name: { type: String, required: [true, 'Name is required'] },
		date: {
			type: Date,
			required: [true, 'Date is required'],
			default: Date.now(),
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'Active', 'submitted', 'Submitted'],
		},
		entries: {
			type: Array,
			required: [true, 'Entries is required'],
			default: [],
		},
	},
	{ timestamps: true }
);

const SAR = model('SAR', sarSchema);

module.exports = SAR;

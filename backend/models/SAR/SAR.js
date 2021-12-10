const { Schema, model } = require('mongoose');

const sarSchema = new Schema(
	{
		name: { type: String, required: [true, 'Name is required'] },
		date: {
			type: Date,
			required: [true, 'Date is required'],
			default: Date.now,
		},
		entries: {
			type: Array,
			required: [true, 'Entries is required'],
			default: [],
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		status: { type: String, default: 'active', enum: ['active', 'submitted'] },
	},
	{ timestamps: true }
);

const SAR = model('SAR', sarSchema);

module.exports = SAR;

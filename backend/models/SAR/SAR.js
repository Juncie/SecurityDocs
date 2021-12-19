const { Schema, model } = require('mongoose');

const sarSchema = new Schema(
	{
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'submitted', 'Submitted', 'closed'],
		},
		name: { type: String, required: [true, 'Name is required'] },
		date: { type: Date, default: Date.now() },
		position: String,
		hours: Number,
		entries: { type: Array, default: [] },
		userID: { type: Number, required: [true, 'userID is required'] },
	},
	{ timestamps: true }
);

const SAR = model('SAR', sarSchema);

module.exports = SAR;

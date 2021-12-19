const { Schema, model } = require('mongoose');

const validStatus = ['active', 'Active', 'submitted', 'Submitted'];

const phoneSchema = new Schema(
	{
		userID: { type: Number, required: [true, 'User ID is required'] },
		name: { type: String, required: [true, 'Name is required'] },
		date: { type: Date, default: Date.now() },
		status: { type: String, default: 'active', enum: validStatus },
		entries: [
			{
				Device: {
					type: String,
					required: [true, 'Serial Number is required'],
				},
				Damage: { type: Boolean, required: [true, 'Damage is required'] },
				DamageDescription: Object,
			},
		],
	},
	{ timestamps: true }
);

const Phone = model('Phone', phoneSchema);

module.exports = SAR;

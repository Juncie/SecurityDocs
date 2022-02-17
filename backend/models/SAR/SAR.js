const { Schema, model } = require('mongoose');

const sarSchema = new Schema(
	{
		date: { type: Date, default: Date.now() },

		//Status is used to determine if the SAR is active or not.
		//If it isn't active it can't be edited.
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'submitted', 'closed'],
		},
		name: { type: String, required: [true, 'Name is required'] },

		// The userID is the user who created the SAR
		userID: { type: Number, required: [true, 'userID is required'] },

		//The position is the job title and
		//the hours is the scheduled hours for the job ie: 11:30-13:30
		position: String,
		hours: Number,

		//Entries should be submitted as an array of objects:
		entries: [
			{ entry: String, time: Date, entryId: String },
			{ required: [true, 'Entries are required'] },
		],
	},
	//Timestamps are used to determine when the SAR was created and last updated
	{ timestamps: true }
);

const SAR = model('SAR', sarSchema);

module.exports = SAR;

const { Schema, model } = require('mongoose');

const sarEntrySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User ID is required'],
	},
	sarId: {
		type: Schema.Types.ObjectId,
		ref: 'SAR',
	},
	entry: {
		type: String,
		required: [true, 'Entry is required'],
	},
	time: {
		type: Date,
		default: Date.now,
	},
	entryId: { type: Schema.Types.ObjectId, auto: true },
});

const SarEntry = model('SarEntry', sarEntrySchema);

module.exports = SarEntry;

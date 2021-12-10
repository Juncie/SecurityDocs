const { Schema, model } = require('mongoose');

const sarEntrySchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		sarId: {
			type: Schema.Types.ObjectId,
			ref: 'SAR',
			required: true,
		},
		entries: {
			type: Object,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const SarEntry = model('SarEntry', sarEntrySchema);

module.exports = SarEntry;

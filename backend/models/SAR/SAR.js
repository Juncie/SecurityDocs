const express = require('express');
const { Schema, model, connections } = require('mongoose');

// let user = res.locals.user;

const sarSchema = new Schema(
	{
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'Active', 'submitted', 'Submitted'],
		},
		// name: `${user.first} ${user.last}`,
		date: { type: Date, default: Date.now() },
		position: String,
		radio: String,
		vehicle: String,
		entries: { type: Array, default: [] },
		// userId: user.userId,
	},
	{ timestamps: true }
);

const SAR = model('SAR', sarSchema);

module.exports = SAR;

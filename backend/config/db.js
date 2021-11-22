const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost/LocalGDK';

const connectDB = async () => {
	await mongoose
		.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(x => console.log(`Connected to ${x.connections[0].name}`))
		.catch(() => console.error('Error connecting to Mongo'));
};

module.exports = connectDB;

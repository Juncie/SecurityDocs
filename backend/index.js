const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = require('./config/db')

const errorHandler = require('./middleware/error')

connectDB();

app.use(express.json())

app.use(cors({origin: ['http://localhost:3000', process.env.clientURL, 'http://localhost:19006', 'http://localhost:5000']}))

// app.use('/api', require('./routes.js'))
app.use('/api/auth', require('./routes/auth.js'))

//Error Handler should be last piece of middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log((`Logged Error: ${err}`));
    server.close(() => process.exit(1))
})

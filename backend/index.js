const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();


const URI = process.env.MONGODB_URI || 'mongodb://localhost/GDK'
console.log(URI)
mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch(() => console.error("Error connecting to Mongo"))

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000', process.env.clientURL, 'http://localhost:19006'] //Add client urls to allow CORS
}))



app.use('/api', require('./routes.js'))




//Sends our one single page on all requests 
// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })






const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
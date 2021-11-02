const {Schema, model} = require('mongoose');

const roles = ['Manager', 'manager', 'Admin', 'admin', 'User', 'user' ]

const locations = ['Wittmann', 'wittmann', 'Mesa', 'mesa', 'Tempe', 'tempe']


const userSchema = new Schema ({
    first: {type: String},
    last: {type: String},
    userId: { type: Number, unique: true},
    role: {type: String, enum: roles},
    location: {type: String, enum: locations}
})


module.exports = model('User', userSchema);
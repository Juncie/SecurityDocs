const {Schema, model} = require('mongoose');

const roles = ['Manager', 'manager', 'Admin', 'admin', 'User', 'user' ]

const locations = ['Wittmann', 'wittmann', 'Mesa', 'mesa', 'Tempe', 'tempe']


const userSchema = new Schema ({
    first: {type: String, required: true},
    last: {type: String, required: true},
    userId: {type: Number, required: true},
    role: {type: String, enum: roles, required: true},
    location: {type: String, enum: locations, required: true,} 
})


module.exports = model('User', userSchema);
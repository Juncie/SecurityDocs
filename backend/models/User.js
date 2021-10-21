const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    last: String,
    first: String,
    userId: Number,
    role: {type: String, enum: ['manager', 'admin', 'user' ]},
    location: String  
})


module.exports = model('User', userSchema);
const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    last: String,
    first: String,
    userId: {type: Number, required: true},
    role: {type: String, enum: ['manager', 'admin', 'user' ]},
    location: String  
})


module.exports = model('User', userSchema);
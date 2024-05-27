const mongoose = require('mongoose');
const { removeAllListeners } = require('nodemon');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        required: true,
        default: "user"
    }
});

const user = mongoose.model('user', userSchema);
module.exports = user;
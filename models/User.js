const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    username: {
        type: String,
        unique: true,
        //required: true
    },
    email: {
        type: String,
        unique: true,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
    emailVerified: {
        type: Boolean,
        default: false,
        //required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isDeliveryGuy: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;
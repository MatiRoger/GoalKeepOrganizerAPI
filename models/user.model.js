const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }

});

module.exports = model('User', userSchema)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: String
    },
    validated: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
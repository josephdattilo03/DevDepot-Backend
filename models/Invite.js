const mongoose = require('mongoose')

const inviteSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    }
})

const Invite = mongoose.model("Invite", inviteSchema)

module.exports = Invite
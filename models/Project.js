const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    projectedFinish: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true,
        default: []
    },
    owner: {
        type: String,
        required: true
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
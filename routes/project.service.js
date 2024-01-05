const Project = require('../models/Project')


async function createProject(req, res) {
    if (!req.isAuthenticated() || req.body.owner || req.body.members) {
        res.status(400).send("Unauthorized")
        return
    }
    try {
        const reqData = {...req.body, owner: req.user.id}
        const project = new Project(reqData)
        const savedProject = await project.save()
        res.status(201).send(savedProject)
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function updateProject(req, res) {
    if (!req.isAuthenticated() || req.body.owner || req.body.members || req.body.createdAt) {
        res.status(400).send("Unauthorized")
        return
    }
    try {
        const updatedProject = await Project.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function addUser(req, res) {
    if (!req.isAuthenticated()) {
        res.status(400).send("Unauthorized")
        return
    }
    try {
        
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}
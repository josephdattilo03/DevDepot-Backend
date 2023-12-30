const User = require("../models/User")

async function createUser(req, res) {
    try {
        const userData = req.body
        const newUser = new User(userData)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch(err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}








module.exports = {createUser}
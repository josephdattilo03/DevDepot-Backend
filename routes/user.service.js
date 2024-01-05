const User = require("../models/User")
const bcrypt = require('bcryptjs')

async function createUser(req, res) {
    try {
        const userData = req.body;
        let newUser = new User(userData);
        //TODO school derivation
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function updateUser(req, res) {
    if (!req.isAuthenticated() || req.body.password) {
        res.status(401).send("Unauthorized")
        return
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser)
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteUser(req, res) {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthorized")
        return
    }
    try {
        const deletedUser = await User.deleteOne({ _id: req.user.id })
        res.status(200).send("User deleted")
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function getUserInformation(req, res) {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthorized")
        return
    }
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = { createUser, updateUser, deleteUser, getUserInformation }
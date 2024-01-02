const User = require("../models/User")
const bcrypt = require('bcryptjs')

async function createUser(req, res) {
    try {
        const userData = req.body;
        let newUser = new User(userData);

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = { createUser }
const express = require('express');
const app = express();
const db = require("./connect");
const port = 3000;
const userService = require('./routes/user.service');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/user/create', userService.createUser);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
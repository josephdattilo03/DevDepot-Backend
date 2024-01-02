const express = require('express');
const app = express();
const session = require('express-session')
const db = require('./connect')
const port = 3000;
const userService = require('./routes/user.service');
const passport = require('./routes/auth.service');
require('dotenv').config()

app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send("hello world")
    }
    else {
        res.send("not authenticated")
    }
});

app.post('/user/create', userService.createUser);

app.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {
    res.status(200)
});

app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
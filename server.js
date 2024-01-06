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

app.get('/user/get', userService.getUserInformation)
app.post('/user/create', userService.createUser)
app.patch('/user/update', userService.updateUser)
app.delete('/user/delete', userService.deleteUser)


app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

app.post('/auth/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {
    res.status(200)
});



app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
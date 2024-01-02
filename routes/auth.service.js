const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async function verify(email, password, done) {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(null, false, { message: 'Email does not exist' });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport
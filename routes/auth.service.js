const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User')
require('dotenv').config()



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        const jsonProfile = profile._json;
        const user = await User.findOne({ email: jsonProfile.email });

        if (!user) {
            const newUser = new User({
                firstName: jsonProfile.given_name,
                lastName: jsonProfile.family_name,
                email: jsonProfile.email,
                // TODO: add school derivation
                google: true
            });

            const createdUser = await newUser.save();
            return done(null, createdUser);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));



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
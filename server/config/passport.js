

var User = require('../api/users/users.model.js');
var LocalStrategy = require('passport-local').Strategy;
//var passport = require('passport');

var passport = require('passport'),
    mongoose = require('mongoose');
//
module.exports = function(passport) {


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) return done(err);

        if (!user || user.password !== password) {
            return done(null, false, {
                message: 'Invalid username or password'
            });
        }

        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }, function (err, user) {
        done(err, user);
    });
});

}
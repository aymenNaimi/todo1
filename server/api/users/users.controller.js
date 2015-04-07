var User = require('./users.model.js');
var passport = require('passport');
var express = require('express');
exports.login = function (req, res, next) {
    console.log('h1');
    passport.authenticate('local', function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return res.sendStatus(401);
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            return res.send();
        });
    })(req, res, next);
}
exports.logout = function (req, res) {
    req.logout();
    res.send();
};







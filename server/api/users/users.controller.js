var User = require('./users.model.js');
var passport = require('passport');
var express = require('express');
exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return res.json(401,"");
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            return res.json();
        });
    })(req, res, next);
}
exports.logout = function (req, res) {
    req.logout();
    res.send();
};







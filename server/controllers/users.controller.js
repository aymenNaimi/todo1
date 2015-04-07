var User = require('../models/users.model.js');
var passport = require('passport');
var express = require('express');
exports.login = function (req, res, next) {
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




exports.isloggedin = function (req, res, next) {
    if (!req.user)
        return res.send(401);
    else
        next();
}

exports.loggedIn =function (req, res) {
    res.json(req.isAuthenticated() ? req.user : '0');
};
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var passport = require('passport');
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'secret123'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/../../public'));
    app.use('/lib', express.static(__dirname + '/../../bower_components'));
}
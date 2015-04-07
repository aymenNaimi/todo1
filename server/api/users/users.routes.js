var passport = require('passport');
var express = require('express');
var usersController = require('../controllers/users.controller.js');



module.exports = function() {

    var app =express();
    app.post('/login',usersController.login  )
    app.get('/logout',usersController.logout);
    app.get('/loggedin',usersController.loggedIn);

    return app

}

var express = require('express');
var usersController = require('./users.controller');
var router = express.Router();
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);
module.exports = router;
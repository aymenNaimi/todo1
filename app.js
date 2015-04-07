var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Schema = require('./server/config/schema.js');
var app = express();
require('./server/config/express.js')(app);
require('./server/config/passport.js')(passport);
app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/bower_components'));
require('./routes.js')(app);
app.use(function (err, req, res, next) {
    console.log("in error management error =" + JSON.stringify(err));
    if (err.name === "ValidationError") {
        res.json(400, err);
    }
    else {
        res.json(500, err);
    }
});
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
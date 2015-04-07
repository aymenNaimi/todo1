/**
 * Created by aymen on 18/03/15.
 */

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


mongoose.connect('mongodb://localhost/dbtodo1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('conection opened');


});

var Todo = require('./models/todos.model.js');
var User = require('./models/users.model.js');

var app =express();

app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret123'
}));
app.use(passport.initialize());
app.use(passport.session());
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

app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/bower_components'));


// Load the routing files
require('./routes/todos.routes.js')(app);
require('./routes/users.routes.js')(app);



app.use(function(err, req, res, next) {
    console.log("in error management error ="+JSON.stringify(err)) ;
    if(err.name === "ValidationError"){

        res.json(400, err);
    }
    else
    { res.json(500, err); }


});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

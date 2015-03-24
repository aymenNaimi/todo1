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

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    description: String
});

var Todo = mongoose.model('Todo', TodoSchema);

var app = express();
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret123'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'title',
    passwordField: 'description'
}, function (username, password, done) {
    Todo.findOne({
        title: username
    }, function (err, user) {
        if (err) return done(err);

        if (!user || user.description !== password) {
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
    Todo.findOne({
        _id: id
    }, function (err, user) {
        done(err, user);
    });
});

app
    .get('/todos', function(req, res, next) {
        if (!req.user)
            return res.send(401);
        else
            next();
    }, function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                res.json(400, "");
            }
            else if (!todos) {
                return res.json(404, todos);
            }
            else {
                res.json(200, todos);
            }
        });
    });

app
    .post('/todos', function (req, res) {
        var todo = new Todo({ title: req.body.title, description: req.body.description });

        todo.save(function (err, silence) {
            if (err) {
                res.json(400, "");
            }
            else if (!(todo.title && todo.description)) {
                return res.json(400, "put tile and description");
            }
            else {
                res.json(201, todo);
            }

        });
    });


app
    .route('/todos/:id').get(function (req, res) {
        Todo.findOne({_id: req.params.id}, function (err, todo) {
            if (err) {
                return res.json(400, "");
            }
            else {
                if (!todo) {
                    res.json(404, "")
                } else {
                    res.json(200, todo);
                }
            }
        });
    })
    .post(function (req, res) {
        res.json({"post by  id": req.params.id});
    })
    .put(function (req, res) {
        Todo.findById(req.params.id, function (err, todo) {


            if (err) {
                res.json(400, "erreur");
            }
            else if (!todo) {
                res.json(404, "");
            }
            else {
                todo.title = req.body.title;
                todo.description = req.body.description;
                todo.save(res.json(200, todo));
            }
        });
    })
    .delete(function (req, res) {
        Todo.findById(req.params.id, function (err, todo) {

            if (err) {
                return handleError(err);
            }
            else if (!todo) {
                res.json(404, "")
            }
            else {
                todo.remove(res.json(200, todo));
            }
        });
    });

app
    .post('/login', function (req, res, next) {
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
    })
    .get('/logout', function(req, res) {
        req.logout();
        res.send();
    });

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

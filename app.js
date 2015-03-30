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
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true

    },
    done: Boolean,
    user_id: { type: Schema.Types.ObjectId, ref: 'Story' }
});


var Todo = mongoose.model('Todo', TodoSchema);

var UserSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String
});


TodoSchema.path('title')
    .validate(function (value) {
        return (value !== 'reserved');
    }, 'this title  reserved')
    .validate(function (value) {
        return (value.length > 3);
    }, 'title should be more than 4 caractéres')
    .validate(function (value, respond) {
        var query = Todo
            .where('title', value)
            .where('user_id', this.user_id);

        if (this._id)
            query.where('_id').ne(this._id);

        query.count(function (err, count) {
            respond(!err && count === 0);
        });
    }, 'the title existe');

isConnected = function (req, res, next) {
    if (!req.user)
        return res.send(401);
    else
        next();
}

var User = mongoose.model('User', UserSchema);

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

app
    .get('/todos', function (req, res, next) {
        isConnected(req, res, next);
    }, function (req, res) {
        Todo.find({user_id: req.user.id}, function (err, todos) {
            if (err) {
                return next(err);

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
    .post('/todos', function (req, res, next) {
        isConnected(req, res, next)
    }, function (req, res,next) {

        var todo = new Todo({ title: req.body.title, description: req.body.description, done: false, user_id: req.user.id });

        todo.save(function (err, todo) {


            if (err) {
              return next(err);


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
    .route('/todos/:id').get(function (req, res, next) {
        isConnected(req, res, next)
    }, function (req, res) {
        Todo.findOne({_id: req.params.id, user_id: req.user.id}, function (err, todo) {
            if (err) {
                return next(err);
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
    .put(function (req, res, next) {
        isConnected(req, res, next)
    }, function (req, res, next) {


        Todo.findOne({ _id: req.params.id, user_id: req.user.id}, function (err, todo) {
            if (err) {
                return next(err);
            }

            if (!todo) {
                return res.json(404, "");
            }

            if (req.body.title !== undefined) {
                todo.title = req.body.title;
            }
            if (req.body.description !== undefined) {
                todo.description = req.body.description;
            }
            if (req.body.done !== undefined) {
                todo.done = req.body.done;
            }
            todo.save(function (err, todo) {
                    if (err) {
                        return next(err);
                    }
                    return res.json(200, todo);
                }
            );
        });


    })
    .delete(function (req, res, next) {
        isConnected(req, res, next)
    }, function (req, res) {
        Todo.findOne({_id: req.params.id, user_id: req.user.id}, function (err, todo) {

            if (err) {
                return next(err);
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
    .get('/logout', function (req, res) {
        req.logout();
        res.send();
    });

app.use(function(err, req, res, next) {
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

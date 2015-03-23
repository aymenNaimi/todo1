/**
 * Created by aymen on 18/03/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbtodo1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('conection opened');
});
Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    description: String

});

var Todo = mongoose.model('Todo', TodoSchema);


var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());

app.get('/todo', function (req, res) {
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

app.post('/todo', function (req, res) {
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
    .route('/todo/:id').get(function (req, res) {
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


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

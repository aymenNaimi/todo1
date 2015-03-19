/**
 * Created by aymen on 18/03/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbtodo1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('cnnection opened');
});
Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    description: String

});


var Todo = mongoose.model('Todo', TodoSchema);
/*

*/





var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
/*
var todos = [{"title":"title1","description":"desc1"},{"title":"title22","description":"desc22"}];
*/


app.get('/todo',function(req, res) {
    Todo.find(function (err, todos) {
        if (err) return console.error(err);
    //    console.log(todos);
        res.json(todos);
    });


});

app.post('/todo',function(req, res) {
    /*
    todos.push(req.body);
    console.log(req.body);
    res.json(req.body);
*/

    var silence = new Todo({ title: req.body.title ,description: req.body.description });
    //console.log('title = '+silence.title+' et description = '+silence.description);

    silence.save(function (err,silence) {
        if (err) return console.error(err);
        //  console.log('title = '+silence.title+' et description = '+silence.description);
        res.json(silence);
    });


});


app.route('/todo/:id').get(function(req, res) {

    Todo.findOne({_id: req.params.id}, function (err, todo) { res.json(todo); });

    /*
    Todo.findById(req.params.id, function (err, todo) {

        var updated = _.merge(todo, req.body);
        updated.save(function (err) {

            return res.json(200, todo);
        });
    });

*/


/*
 res.json({"get by id":req.params.id});

*/





}).post(function(req, res) {
    res.json({"post by  id":req.params.id});

}).put(function(req, res) {

/*
    Todo.findById(id, function (err, todo) {
        if (err) return handleError(err);

        todo.title = '00';
        todo.save();
        res.json(todo)
    });

    Todo.update({ _id: req.params.id }, { $set: { description : 'aaaa' }});

     res.json("ok");
 */


    Todo.findById(req.params.id , function (err, todo) {

/*




      */

        console.log( req.body.title);
        console.log(req.body.description);
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.save(function (err) {
            if (err) return handleError(err);
            res.json(todo);
        });
    });


}).delete(function(req, res) {

    Todo.findById(req.params.id, function (err, todo) {


        todo.remove();
        res.json(204,"");
    });



    /*

    res.json({"delete by id":req.params.id});
*/
});




var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

/*







    */
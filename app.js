/**
 * Created by aymen on 18/03/15.
 */
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
var todos = [{"title":"title1","description":"desc1"},{"title":"title22","description":"desc22"}];


app.get('/todo',function(req, res) {
    res.json(todos);

});

app.post('/todo',function(req, res) {
    todos.push(req.body);
    console.log(req.body);
    res.json(req.body);

});


app.route('/todo/:id').get(function(req, res) {

    res.json({"get by id":req.params.id});

}).post(function(req, res) {
    res.json({"post by  id":req.params.id});
}).put(function(req, res) {
 res.send({"put by id":req.params.id});

 }).delete(function(req, res) {
    res.json({"delete by id":req.params.id});

});



var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});



var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    description: String,

});

mongoose.model('Todo', TodoSchema);
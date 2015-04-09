var app = require('../server/app.js');
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');
var user, todo;
describe('Todo Model Unit Tests:', function () {
    beforeEach(function (done) {
        user = new User({
            username: 'usert',
            password: 'passt',
            first_name: 'first Name Test',
            last_name: 'last Name test',
            email: 'email@est.com'
        });
        user.save(function () {
            todo = new Todo({
                title: 'Todo test',
                description: 'Todo test',
                user: user
            });
            done();
        });
    });
    describe('Testing the save method', function () {
        it('Should be able to save without problems', function () {
            todo.save(function (err) {
                should.not.exist(err);
            });
        });
        it('Should not be able to save an todo without a title',
            function () {
                todo.title = '';
                todo.save(function (err) {
                    should.exist(err);
                });
            });
    });
    afterEach(function (done) {
        Todo.remove(function () {
            User.remove(function () {
                done();
            });
        });
    });
});
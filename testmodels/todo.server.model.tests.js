var app = require('../server/app.js');
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');
var user, todo;
describe('Todo Model Unit Tests:', function () {
    before(function (done) {
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
        it('Should not be able to save an todo without a description', function () {
            todo.description = '';
            todo.save(function (err) {
                should.exist(err);
            });
        });
        it('Should not be able to save an todo reserved description', function () {
            todo.description = 'description';
            todo.save(function (err) {
                should.exist(err);
            });
        });
        it('Should not be able to save an todo without a title', function () {
            todo.description = 'abcd';
            todo.title = '';
            todo.save(function (err) {
                should.exist(err);
            });
        });
        it('Should not be able to save an todo with short title', function () {
            todo.title = 'afr';
            todo.save(function (err) {
                should.exist(err);
            });
        });
        it('Should not be able to save an todo with reserved title', function () {
            todo.title = 'title';
            todo.save(function (err) {
                should.exist(err);
            });
            todo.title = 'reserved';
            todo.save(function (err) {
                should.exist(err);
            });
        });
        it('Should not be able to save an todo with and existing title', function () {
            todo.title = 'existing title';
            todo.save(function (err) {
                should.not.exist(err);
            });
            todo.save(function (err) {
                should.exist(err);
            });
        });
    });
    after(function (done) {
        Todo.remove(function () {
            User.remove(function () {
                done();
            });
        });
    });
});
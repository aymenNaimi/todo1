var app = require('../../app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');
var user, todo;
var agent = request.agent(app);
describe('todos', function () {
    before(function (done) {
        user = new User({
            username: 'usertest',
            password: 'passtest',
            first_name: 'first Name Test',
            last_name: 'last Name test',
            email: 'email@est.com'
        });
        user.save(function (err, data) {
            todo = new Todo({
                title: 'Todot ',
                description: 'Todottt',
                done: false,
                user_id: user._id
            });
            todo.save(function () {
                done();
            });
        });
    });
    describe('testing the users controllers ', function () {
        it(" should don't be able to login  ", function (done) {
            agent.post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": 'ff', "password": 'hh'})
                .expect(401)
                .end(function (err, res) {
                    done(err);
                });
        });
        it(" should  be able to login  ", function (done) {
            agent.post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": user.username, "password": user.password })
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });
        });
        it(" should be connected  ", function (done) {
            agent.get('/todos/loggedin/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('username', user.username);
                    res.body.should.have.property('password', user.password);
                    res.body.should.have.property('first_name', user.first_name);
                    res.body.should.have.property('last_name', user.last_name);
                    res.body.should.have.property('email', user.email);
                    done(err);
                });
        });
        it(" should be able to logout  ", function (done) {
            agent.get('/users/logout/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });
        });
        it(" should not connected  ", function (done) {
            agent.get('/todos/loggedin/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.exactly('0');
                    done(err);
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

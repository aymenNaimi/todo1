var app = require('../server/app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');
var user, todo;
describe('login controller test', function () {
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
                title: 'Todot ',
                description: 'Todot',
                user: user
            });
            done();
        });
    });
    describe('login controller test ', function () {
        it(' user should be connected  ', function (done) {
            request(app).post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": "usert", "password": "passt" })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });
        });
        it(" user should don't be able to connect  ", function (done) {
            request(app).post('/users/login/')
                .set('Accept', 'application/json')
                .send({                  "username": "usert", "password": "passttt"               })
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
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
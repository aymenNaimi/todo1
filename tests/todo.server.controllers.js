var app = require('../server/app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');
var user, todo;
describe('todos', function () {
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
                title: 'Todot ',
                description: 'Todot',
                user: user
            });
            done();
        });
    });
    describe('todos ,get ', function () {
        it(" should be don't able de get todos  ", function (done) {
            request(app).get('/todos/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    done(err);
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
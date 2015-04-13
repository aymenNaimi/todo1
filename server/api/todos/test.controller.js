var app = require('../../app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');
var user, todo;
var agent = request.agent(app);
var agentnc = request.agent(app);
var anonymous = request.agent(app);
describe('todos', function () {
    beforeEach(function (done) {
        user = new User({
            username: 'usertest',
            password: 'passtest',
            first_name: 'first Name Test',
            last_name: 'last Name test',
            email: 'email@est.com'
        });
        anonymous_user = new User({
            username: 'userano',
            password: 'passano',
            first_name: 'first Name ano',
            last_name: 'last Name ano',
            email: 'emailano@est.com'
        });
        anonymous_user.save();

        user.save(function (err, data) {
            todo = new Todo({
                title: 'Todot ',
                description: 'Todottt',
                done: false,
                user_id: user._id
            });
            todo.save(function () {
                agent.post('/users/login/')
                    .set('Accept', 'application/json')
                    .send({"username": user.username, "password": user.password })
                    .expect(200)
                    .end(function (err, res) {
                        done(err);
                    });
            });
        });
    });
    describe(' testing the todos controllers ', function () {
        it(" should don't be able get todos  ", function (done) {
            agentnc.get('/todos/')
                .set('Accept', 'application/json')
                .expect(401)
                .end(function (err, res) {
                    done(err);
                });
        });
        it(" should be  able de get todos  ", function (done) {
            agent.get('/todos/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('title', todo.title);
                    res.body[0].should.have.property('description', todo.description);
                    res.body[0].should.have.property('done', todo.done);
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('user_id');
                    done(err);
                });
        });

        it(" should be  able de get todo by id  ", function (done) {
            agent.get('/todos/' + todo._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('title', todo.title);
                    res.body.should.have.property('description', todo.description);
                    res.body.should.have.property('done', todo.done);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user_id');
                    done(err);
                });
        });
        it(" test add new todo   ", function (done) {
            var addTitle = 'title225';
            var addDescription = 'desc2255';
            agent.post('/todos/')
                .set('Accept', 'application/json')
                .send({"title": addTitle, "description": addDescription })
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    res.body.should.have.property('title', addTitle);
                    res.body.should.have.property('description', addDescription);
                    res.body.should.have.property('done', false);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user_id');

                    agent.get('/todos/')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            res.body.should.be.an.Array.and.have.lengthOf(2);
                            done(err);
                        });
                });
        });
        it(" test update todo ", function (done) {
            var updateTitle = 'allmas';
            var updateDescription = '45937';
            agent.put('/todos/' + todo._id)
                .set('Accept', 'application/json')
                .send({"title": updateTitle, "description": updateDescription })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('title', updateTitle);
                    res.body.should.have.property('description', updateDescription);
                    res.body.should.have.property('done', todo.done);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user_id');
                    done(err);
                });
        });
        it(" test delete todo   ", function (done) {
            agent.delete('/todos/' + todo._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('title', todo.title);
                    res.body.should.have.property('description', todo.description);
                    res.body.should.have.property('done', todo.done);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user_id');
                    agent.get('/todos/')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            res.body.should.be.an.Array.and.have.lengthOf(0);
                            done(err);
                        });
                });
        });
        it(" should be d'ont   able de get todo by id  of other users  ", function (done) {
                anonymous.post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": anonymous_user.username, "password": anonymous_user.password })
                .expect(200)
                .end(function (err, res) {
                        anonymous.get('/todos/' + todo._id)
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(404)
                            .end(function (err, res) {
                                done(err);
                            });
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

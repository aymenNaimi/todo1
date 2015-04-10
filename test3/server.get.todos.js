var app = require('../server/app.js'),
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
                description: 'Todot',
                done: false,
                user_id: user._id
            });
            todo.save(function () {
                done();
            });
        });
    });
    describe('todos ,get ', function () {
        it(" should be able to login  ", function (done) {
            agent.post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": user.username, "password": user.password })
                .expect(200)
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
                    console.log('**********');
                    console.log(res.body);
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('title', todo.title);
                    res.body[0].should.have.property('description', todo.description);
                    res.body[0].should.have.property('done', todo.done);
                    console.log("todo id +++++++++++++++++++" + todo._id);
                    var id = todo._id;
                    console.log("id  +++++++++++++++++++" + id);
                    //  res.body[0].should.have.property('_id',id);
                    //   res.body[0].should.have.property('user_id',todo.user_id);
                    done(err);
                });
        });
        it(" should be  able de get todo by id  ", function (done) {
            agent.get('/todos/' + todo._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log('**********');
                    console.log(res.body);
                    res.body.should.have.property('title', todo.title);
                    res.body.should.have.property('description', todo.description);
                    res.body.should.have.property('done', todo.done);
                    //   res.body.should.have.property('_id',todo._id);
                    //    res.body.should.have.property('user_id',todo.user_id);
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


var app = require('../server/app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');
var user, todo;

var agent = request.agent(app);
describe('todos', function () {

    /* beforeEach(function (done) {
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

     todo.save(function () {
     done();
     });
     });
     }); */

    describe('todos ,get ', function () {
        it(" should be  able de get todos  ", function (done) {
            agent.post('/users/login/')
                .set('Accept', 'application/json')
                .send({"username": "aymen", "password": "allmas" })
                .expect(200)
                .end(function () {
                    agent.get('/todos/')
                        .set('Accept', 'application/json')

                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            res.body[0].should.have.property('title');
                            res.body[0].should.have.property('description');
                            res.body[0].should.have.property('done');
                            res.body[0].should.have.property('_id');
                            res.body[0].should.have.property('user_id');
                            console.log(res.body);
                            //   console.log(res.body[0]);
                            done(err);
                        });
                });
        });
        /*
         it(" should be don't able de get todos  ", function (done) {

         });
         */
    });
    /*  afterEach(function (done) {
     Todo.remove(function () {
     User.remove(function () {
     done();
     });
     });
     });*/
});


/*
 var mongoose = require('mongoose');
 require('../../server/config/mongoose.js');

 var User = require('../../server/api/users/users.model.js');
 var    Todo = mongoose.model('../../server/api/todos/todos.model.js');
 */
describe('todos E2E Tests:', function () {

    beforeEach(function () {
        /*

         user = new User({
         username: 'aymen11',
         password: 'allmas11',
         first_name: 'first Name Test',
         last_name: 'last Name test',
         email: 'email@est.com'
         });


         user.save(function (err, data) {
         todo = new Todo({
         title: 'golf',
         description: '7',
         done: false,
         user_id: user._id
         });
         todo.save();

         });


         */
        browser.get('http://localhost:3000/#/login');
        element(by.model('mycl.username')).sendKeys('aymen');
        element(by.model('mycl.password')).sendKeys('allmas');
        element(by.css('button[type=submit]')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
    });
    describe('crud todos test', function () {
        it('testing add todo', function () {
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
            element(by.buttonText("Add todo")).click();
            element(by.model('mycl.titleup')).sendKeys('peugeot');
            element(by.model('mycl.descriptionup')).sendKeys('407');
            element(by.buttonText("save")).click();
            var todoList = element.all(by.repeater('l in mycl.todos'));
            expect(todoList.count()).toEqual(2);
            element.all(by.repeater('l in mycl.todos').column('title')).then(function (elems) {
                expect(elems[1].getText()).toEqual('peugeot');
            });
            element.all(by.repeater('l in mycl.todos').column('description')).then(function (elems) {
                expect(elems[1].getText()).toEqual('407');
            });
            element.all(by.repeater('l in mycl.todos').column('done')).then(function (elems) {
                expect(elems[1].getText()).toEqual('false');
            });
        });

        it('testing done todo', function () {
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
            element.all(by.repeater('l in mycl.todos')).then(function (elems) {
                elems[1].all(by.css('button')).then(function (elem) {
                    elem[0].click();
                });
            });
        });
        it('testing update todo', function () {
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
            element.all(by.repeater('l in mycl.todos')).then(function (elems) {
                elems[1].all(by.css('button')).then(function (elem) {
                    elem[1].click();
                    element(by.model('mycl.descriptionup')).clear();
                    element(by.model('mycl.descriptionup')).sendKeys('309');
                    element(by.buttonText("save")).click();
                });
            });
        });
        /*
         it('testing delete todo', function () {
         expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
         element.all(by.repeater('l in mycl.todos')).then(function (elems) {
         elems[0].all(by.css('button')).then(function (elem) {
         elem[2].click();
         browser.switchTo().alert().accept();
         });
         });
         var todoList = element.all(by.repeater('l in mycl.todos'));
         expect(todoList.count()).toEqual(1);
         });
         */
    });
    /*
     afterEach(function (done) {
     Todo.remove(function () {
     User.remove(function () {
     done();
     });
     });
     });
     */

});
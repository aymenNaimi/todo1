
var express = require('express');
var controller = require('./todos.controller');



var router = express.Router();
router.get('/', controller.isloggedin,controller.getAllTodos );
router.post('/', controller.isloggedin, controller.addTodo);
router.get('/loggedIn',controller.loggedIn);
router.get('/:id', controller.isloggedin, controller.getOneTodo);
router.post('/:id', controller.isloggedin, controller.getOneTodo);
router.put('/:id',  controller.isloggedin,controller.updateTodo);
router.delete('/:id', controller.isloggedin, controller.deleteTodo);

    module.exports = router ;
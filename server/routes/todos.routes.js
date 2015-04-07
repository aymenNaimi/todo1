
var express = require('express');
var controller = require('../controllers/todos.controller');

/*
module.exports = function() {
    var app =express();


app.route('/todos/:id')
   .get(todoController.getOneTodo)
   .put(todoController.updateTodo)
   .delete(todoController.deleteTodo);

    app.route('/todos')
        .post(todoController.addTodo);

    app.route('/todos')
        .get(todoController.getAllTodo);


return app

}
*/




var router = express.Router();

router.post('/', controller.addTodo);



    module.exports = router ;
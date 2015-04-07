var Todo = require('../models/todos.model.js');
exports.addTodo = function(req, res, next) {


        var todo = new Todo({ title: req.body.title, description: req.body.description, done: false, user_id: req.user.id });

        todo.save(function (err, todo) {


            if (err) {
                return next(err);


            }
            else if (!(todo.title && todo.description)) {

                return res.json(400, "put tile and description");
            }
            else {
                res.json(201, todo);
            }

        });

};
/*
exports.getAllTodos = function (req, res) {
    Todo.find({user_id: req.user.id}, function (err, todos) {
        if (err) {
            return next(err);

        }
        else if (!todos) {
            return res.json(404, todos);
        }
        else {
            res.json(200, todos);
        }
    });

};

*/
exports.getOneTodo = function (req, res) {
    Todo.findOne({_id: req.params.id, user_id: req.user.id}, function (err, todo) {
        if (err) {
            return next(err);
        }
        else {
            if (!todo) {
                res.json(404, "")
            } else {
                res.json(200, todo);
            }
        }
    });
};


exports.updateTodo= function (req, res, next) {


    Todo.findOne({ _id: req.params.id, user_id: req.user.id}, function (err, todo) {
        if (err) {
            return next(err);
        }

        ;
        if (!todo) {
            return res.json(404, "");
        }

        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }
        if (req.body.description !== undefined) {
            todo.description = req.body.description;
        }
        if (req.body.done !== undefined) {
            todo.done = req.body.done;
        }
        todo.save(function (err, todo) {
                if (err) {
                    return next(err);
                }
                return res.json(200, todo);
            }
        );
    });


}
exports.deleteTodo= function (req, res, next) {

    Todo.findOne({_id: req.params.id, user_id: req.user.id}, function (err, todo) {

        if (err) {
            return next(err);
        }
        else if (!todo) {
            res.json(404, "")
        }
        else {
            todo.remove(res.json(200, todo));
        }
    });

}



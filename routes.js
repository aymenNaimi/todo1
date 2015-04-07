


module.exports = function(app) {
app.use('/todos', require('./server/api/todos/todos.routes'));
app.use('/users', require('./server/api/users/users.routes'));
}
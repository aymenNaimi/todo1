module.exports = function(app) {
app.use('/todos', require('./api/todos/todos.routes'));
app.use('/users', require('./api/users/users.routes'));
}
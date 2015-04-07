


module.exports = function(app) {
app.use('/todos', require('./server/api/todos/todos.routes'));
}



module.exports = function(app) {
app.use('/todos', require('./server/routes/todos.routes'));
}
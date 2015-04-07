// Load the module dependencies
var mongoose = require('mongoose');

   var Schema = mongoose.Schema;



var TodoSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true

    },
    done: Boolean,
    user_id: { type: Schema.Types.ObjectId, ref: 'Story' }
});

TodoSchema.path('title')
    .validate(function (value) {
        return (value !== 'reserved');
    }, 'this title  reserved')
    .validate(function (value) {
        return (value !== 'title');
    }, 'this title  reserved')
    .validate(function (value) {
        return (value.length > 3);
    }, 'title should be more than 4 caractéres')
    .validate(function (value, respond) {
        var query = Todo
            .where('title', value)
            .where('user_id', this.user_id);

        if (this._id)
            query.where('_id').ne(this._id);

        query.count(function (err, count) {
            respond(!err && count === 0);
        });
    }, 'this title found');

TodoSchema.path('description')
    .validate(function (value) {
        console.log("description ="+value);

        return (value.length > 0);
    }, 'description required')
    .validate(function (value) {
        return (value !== 'description');
    }, 'this description reserved');
var Todo = mongoose.model('Todo', TodoSchema);

module.exports =Todo ;
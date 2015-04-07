// Load the module dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String
});

var User = mongoose.model('User', UserSchema);



module.exports =User ;
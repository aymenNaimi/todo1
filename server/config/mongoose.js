var mongoose = require('mongoose');
var config = require('./env');

mongoose.connect(config.mongodb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('conection opened');
});

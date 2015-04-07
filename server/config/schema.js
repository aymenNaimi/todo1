var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbtodo1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('conection opened');
});

var Schema = mongoose.Schema;


module.exports = Schema ;
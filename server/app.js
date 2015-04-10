process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var passport = require('passport');
require('./config/mongoose.js');
var app = express();
require('./config/express.js')(app);
require('./config/passport.js')(passport);
require('./routes.js')(app);
require('./errorsManager.js')(app);
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = app;
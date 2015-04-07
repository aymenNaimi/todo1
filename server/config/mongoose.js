/*
 var   mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
    // Use Mongoose to connect to MongoDB

    mongoose.connect('mongodb://localhost/dbtodo1');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('conection opened');


    });

    // Load the 'User' model
    require('../models/users.model.js');
    require('../models/todos.model.js');


    return db;
};
    */
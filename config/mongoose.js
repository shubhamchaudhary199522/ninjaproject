const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting to db.'));

db.once('open', function(){
    console.log('Database is connecting successfully :: MongoDB');
});

module.exports = db;
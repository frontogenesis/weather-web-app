const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/loginapp');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    name: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };

module.exports.createUser = ((newUser, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
})
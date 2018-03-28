const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String
    }
});

UserSchema.statics.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

UserSchema.statics.getUserByUsername = function (username, callback) {
    const User = this;
    const query = { username: username };
    User.findOne(query, callback);
};

UserSchema.statics.getUserById = function (id, callback) {
    const User = this;
    User.findById(id, callback);
};

UserSchema.statics.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidatorPlugin = require('mongoose-unique-validator'),
    timestampPlugin = srcRequire('plugins/timestamp')

const UserScheme = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
});

// Apply the uniqueValidator plugin to userSchema.
UserScheme.plugin(uniqueValidatorPlugin);
UserScheme.plugin(timestampPlugin);

const User = module.exports = mongoose.model('User', UserScheme);

module.exports.getById = function(id) {
    return User.findById(id).select("-password");
}

module.exports.getUserByEmail = function(email){
    const query = {email: email}
    return User.findOne(query).select("-password");
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}
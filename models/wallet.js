var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    address: {
        type: String,
        require: [true, 'ID Required']
    },
    wallet_key: {
        type: String,
        require: [false, 'Public Key Required']
    },
    created: {
        type: Date,
        required: [true, 'Creation Date Required'],
        default: Date.now

    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('wallet_key')) return next();

    bcrypt.genSalt(4, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.wallet_key, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
            if (error) {
                reject(error)
            } else {
                resolve(isMatch);
            }
        });
    })
};

module.exports = mongoose.model('User', UserSchema);
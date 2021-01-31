var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var WalletSchema = mongoose.Schema({
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

WalletSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('wallet_key')) return next();

    bcrypt.genSalt(4, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.wallet_key, salt, function(err, hash) {
            if (err) return next(err);

            user.wallet_key = hash;
            next();
        });
    });
});

UserSchema.methods.compareKey = function(candidateKey, cb) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidateKey, this.wallet_key, function(error, isMatch) {
            if (error) {
                reject(error)
            } else {
                resolve(isMatch);
            }
        });
    })
};

module.exports = mongoose.model('Wallet', UserSchema);
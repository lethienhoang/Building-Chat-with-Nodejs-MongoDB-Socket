const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email',
        },

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password need to be longer'],
        trim: true,

    },
    displayname: {
        type: String,
        required: [true, 'Displayname is required']
    }
});


UserSchema.pre('save', function(next) {

});

UserSchema.methods.verifyPassword = function(comparePassword, cb) {
    bcrypt.compare(comparePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch);
    });
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);

    // set expire
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        id: this._id,
        email: this.email,
        displayname: this.displayname,
        exp: parseInt(exp.getTime() / 1000)
    }, config.get('jwtPrivateKey'))
}

UserSchema.methods.toAuthJSON = function(){
    return {
        id: this._id,
        email: this.email,
        displayname: this.userName,
        token: this.generateJWT()
    };
};
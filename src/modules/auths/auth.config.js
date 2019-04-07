const LocalStrategy = require('passport-local').Strategy;
const User = require('../users/user.model');

const option = {
    usernameField: 'email',
}


module.exports = function(passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



module.use('local', new LocalStrategy(option, function(email, password, done) {
    User.findOne({email: email, passport: password}, function(err, user) {

        // Validation
        if (err) { return done(err);}
        if (!user) { return done(null, null); }

        // Call Verify password
        user.verifyPassword(password, function(err, isMatch) {
            if (err) { return done(err , false); }
            if (!isMatch) { return done(null , false); }
        });

        // Return callback
        return done(null, user);
    });
}));
}
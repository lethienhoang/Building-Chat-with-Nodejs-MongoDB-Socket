const userValidation = require('./user.validation');
const User = require('./user.model');
const _ = require('lodash');
const passport = require('passport');
exports.signup_post = async function(req, res) {
    try {

        // Validation
        userValidation(req.body);

        // Create user
        const user = new User(req.body);
        await user.save();

        // Return result
        return res.status(200).send(user.toAuthJSON());

    } catch (e) {
        return res.status(500).send(e);
    }
}


exports.login_post =  async function(req, res, next) {
    try {

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            
            if (err) { return next(err);}

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.send({ user: user.toAuthJSON() });
            }

            return res.status(400);
        })(req, res, next);


    } catch (e) {
        return res.status(500).send(e);
    }
}
const hemler = require('helmet');
const compress = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const logging = require('../logs/logging');
const passport = require('passport');
const auth_config = require('../modules/auths/auth.config');

module.exports = function (app) {

    // allow CORS
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(compress())
        app.use(hemler())
    } else {
        app.use(morgan)
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Logging
    logging(app);

    // passport config
    auth_config(passport);
}
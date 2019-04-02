const hemler = require('helmet');
const compress = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')

module.exports = function(app) {

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
}
const wintons = require('../configs/winston');
const morgan = require('morgan');

module.exports = function(app) {
    app.use(morgan('combined', {stream: wintons.stream}));

    app.use(function(err, req, res, next){
        wintons.error(`${err.status || 500 } - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(err.status || 500);

        // render error page here
        
    })
}
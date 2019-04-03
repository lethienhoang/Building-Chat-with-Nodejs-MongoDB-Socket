const winston = require('winston');
const appRoot = require('app-root-path');

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxFiles: 5,
        maxsize: 5242880,
        colorize: false,
    },
    console: {
        level: 'warn',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};


const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message)
    }
};

module.exports = logger;
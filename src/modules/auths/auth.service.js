const jwt = require('express-jwt');
const config = require('../../configs');
const constant =  require('../../constants/constant');

function getTokenFromHeaders(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }
}


var auth = {
    required: jwt({
        secret: config.get(constant.JWT_SECRET),
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: config.get(constant.JWT_SECRET),
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeaders
    })
};

module.exports = auth;
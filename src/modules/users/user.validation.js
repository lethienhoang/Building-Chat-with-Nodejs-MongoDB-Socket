const Joi = require('joi');
const constant = require('../../constants/constant');
exports.signup = function(model) {
    const validate = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).regex(constant.PASSWORD_REG).required(),
        displayname: Joi.string().required()
    }
}


exports.login = function(model) {
    const validate = {
        email: Joi.string().email().required(),
        password: Joi.string.min(6).regex(constant.PASSWORD_REG).required()
    }
}
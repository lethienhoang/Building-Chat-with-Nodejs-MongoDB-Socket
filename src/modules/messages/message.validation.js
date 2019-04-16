const Joi = require('joi');

exports.message_post = function(model) {

    const validate = {
        message: Joi.string().required()
    }

    return Joi.validate(model, validate);
}
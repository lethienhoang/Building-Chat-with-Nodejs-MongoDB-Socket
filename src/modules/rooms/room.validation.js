const Joi = require('joi');

exports.create_room = function(model) {
    const validate = {
        title: Joi.string().min(5).required()
    }

    return Joi.validate(model, validate);
}

exports.member_join_to_room = function(model) {
    const validate = {
        id: Joi.string().required()
    }

    return Joi.validate(model, validate);
}
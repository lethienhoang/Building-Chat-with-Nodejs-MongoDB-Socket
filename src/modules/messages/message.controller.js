const Message = require('./message.model');
const User = require('../users/user.model');
const Room = require('../messages/message.model');
const messageValidation = require('./message.validation');
const _ = require('lodash');

exports.message_post = async function(req, res) {

    try {
        // Validate
        const { error } = messageValidation.message_post(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        if (!req.playload.id) return res.status(401).send('Authentication is invalid');

        const user = await User.findById(req.playload.id);
        if (!user)  return res.status(404).send("User was not found");

        const room = await Room.findById(req.roomId);
        if (!room)  return res.status(404).send("Room was not found");

        const model =  Message(_.pick(req.body, ['message']));
        model.createdBy = user;
        model.room = room;


        const message = await model.save();

        return res.status(200).send(message);
        


    } catch (e) {
        return res.status(500).send(e);
    }
}
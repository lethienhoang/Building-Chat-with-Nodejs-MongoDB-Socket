const Room = require('./room.model');
const User = require('../users/user.model');
const roomValidation = require('./room.validation');
const _ = require('lodash');


exports.room_query = async function(req, res) {
    try {

        // Query 


        let limit = 20;
        let offset = 0;

        if (req.body !== undefined) {

            if (typeof req.body.limit !== undefined) {
                limit = req.body.limit;
            }
    
            if (typeof req.body.offset !== undefined) {
                offset = req.body.offset;
            }
    
        }      


        // get data from room
        const rooms = await Room.find(req.body.query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createAt:'desc'})
            .select({ title: 1, description: 1})
        // Return
        res.status(200).send(rooms);



    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.room_create = async function(req, res) {
    try {

        // Validate
        const { error } = roomValidation.create_room(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        if (!req.playload.id) return res.status(401).send('Authentication is invalid');

        const user = await User.findById(req.playload.id);
        if (!user)  return res.status(404).send("User was not found");

        // Create room
        const model = new Room(_.pick(req.body, ['title', 'description']));
        model.createdBy = user;

        // Save
        const room  = await model.save();

        // Return
        res.status(200).send(_.pick(room, ['title', 'description']));



    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.room_join_by_member = async function(req, res) {
    try {

        // Validate
        const { error } = roomValidation.member_join_to_room(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.playload.id);
        if (!user)  return res.status(404).send("User was not found");


        // Add member to room
        const model = await Room.findByIdAndUpdate(req.body.id, {
            $push: { members: user }
        });
        
        // Save
        const room  = await model.save();

        // Return
        res.status(200).send(_.pick(room, ['title', 'description']));

    } catch(e) {

    }
}


exports.room_delete = async function(req, res) {
    try {

        // Validate
        const { error } = roomValidation.member_join_to_room(req.body);
        if (error) return res.status(400).send(error.details[0].message);

    
        // Add member to room
        const model = await Room.deleteOne(req.body.id);
        
        // Save
        await model.save();

        // Return
        res.status(200).send('Delete Room is successfully');

    } catch(e) {

    }
}
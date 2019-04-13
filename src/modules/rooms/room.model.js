const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
    },
    members: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Room', RoomSchema);
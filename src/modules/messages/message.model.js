const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    message: {
        type: String,
        required: [true, 'Title is required'],
    },
    createdBy: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    room: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'Room',
        required: true
    }

});


module.exports = mongoose.model('Message', MessageSchema);
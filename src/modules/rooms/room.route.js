const express = require('express');
const router = express.Router();
const roomController =  require('./room.controller');
const auth = require('../auths/auth.service');

router.get('/', auth.optional, roomController.room_query);
router.post('/', auth.required, roomController.room_create);
router.post('/:id', auth.required, roomController.room_join_by_member);
router.delete('/:id', auth.required, roomController.room_delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/signup', userController.signup_post);

module.exports = router;
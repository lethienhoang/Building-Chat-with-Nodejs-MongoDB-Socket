const express = require('express');
const router = express.Router();
const userController =  require('../users/user.controller');


router.post('/login', userController.login_post);

module.exports = router;
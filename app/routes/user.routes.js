const express = require('express');
const router = express.Router();
var listUsers = require('../controllers/user.controller');

router.get('/', listUsers);

module.exports = router;

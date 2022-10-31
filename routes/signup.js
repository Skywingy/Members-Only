var express = require('express');
var router = express.Router();

const signup_controller = require('../controller/signup');

// Get signup index.
router.get("/", signup_controller.index);

// POST request for creating User.
router.post("/", signup_controller.create);

module.exports = router;

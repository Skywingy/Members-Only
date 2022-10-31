var express = require('express');
var router = express.Router();

const signin_controller = require('../controller/signin');

// Get signup index.
router.get("/", signin_controller.index);

// POST request for creating User.
router.post("/", signin_controller.enter);



module.exports = router;

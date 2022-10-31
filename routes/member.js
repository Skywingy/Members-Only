var express = require('express');
var router = express.Router();

const member_controller = require('../controller/member');

// Get signup index.
router.get("/", member_controller.index);

// POST request for creating User.
router.post("/", member_controller.enter);



module.exports = router;

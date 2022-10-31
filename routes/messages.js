var express = require('express');
var router = express.Router();

const msg_controller = require('../controller/messages');

// Get message index.
router.get("/", msg_controller.index);

// POST request for creating message.
router.post("/", msg_controller.enter);

//Delete
router.post("/", msg_controller.delete_message_post);



module.exports = router;
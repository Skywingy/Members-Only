var express = require('express');
var router = express.Router();
var index_controller =  require('../controller/index');
const msg_controller = require('../controller/messages');

/* GET home page. */
router.get('/', index_controller.index);

/// ------- DELETE A MESSAGE ------- ///
router.get("/delete-message/:id", msg_controller.delete_message_get);
router.post("/delete-message/:id", msg_controller.delete_message_post);


module.exports = router;

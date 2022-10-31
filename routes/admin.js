var express = require('express');
var router = express.Router();

const admin_controller = require('../controller/admin');

// Get admin index.
router.get("/", admin_controller.index);

// POST request for updating admin.
router.post("/", admin_controller.enter);



module.exports = router;

const express = require("express");
const { createRoom } = require("../controller/rooms");
const { protect } = require("../middleware/protect");
const router = express.Router();
// Room Routes
router.route("/").post(protect, createRoom)
module.exports = router;

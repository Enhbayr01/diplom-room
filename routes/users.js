const express = require("express");
const { createUser, signInUser, getInfo } = require("../controller/users");
const { protect } = require("../middleware/protect");
const router = express.Router();

router.route("/").post(createUser).get(protect, getInfo)
router.route("/").post(createUser).get(protect, getInfo)
router.route("/signin").post(signInUser);
module.exports = router;

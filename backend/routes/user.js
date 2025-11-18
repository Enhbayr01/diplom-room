// backend/routes/user.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controller/users");


router.get("/", ctrl.getUsers);
router.get("/:id", ctrl.getUserById);
router.put("/:id", ctrl.updateUser);

module.exports = router;      

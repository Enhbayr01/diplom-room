// backend/routes/user.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controller/users");


router.get("/", ctrl.getUsers);
router.get("/:id", ctrl.getUserById);
router.post("/", ctrl.createUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);
router.post("/login", ctrl.loginUser);

module.exports = router;      

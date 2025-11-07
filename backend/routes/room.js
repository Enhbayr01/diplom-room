const express = require("express");
const router = express.Router();
const ctrl = require("../controller/rooms");

router.get("/", ctrl.getAllRooms);
router.get("/:id", ctrl.getRoomById);
router.post("/", ctrl.createRoom);
router.put("/:id", ctrl.updateRoom);
router.delete("/:id", ctrl.deleteRoom);

module.exports = router;

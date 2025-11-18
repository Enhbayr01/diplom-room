const express = require("express");
const router = express.Router();
//const protect = require("../middleware/protect");
const { 
  getNotifications,
  getNotificationById,
  createNotification,    
  markAsSeen,
  deleteNotification
} = require("../controller/notifications");

// Protect middleware ашиглах
router.get("/",  getNotifications);
router.get("/:id",  getNotificationById);
router.post("/", createNotification);   
router.put("/:id/seen",  markAsSeen);
router.delete("/:id",  deleteNotification);

module.exports = router;
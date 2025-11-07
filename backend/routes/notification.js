const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { 
  getNotifications,
  getNotificationById,
  createNotification,    
  markAsSeen,
  deleteNotification
} = require("../controller/notifications");

// Protect middleware ашиглах
router.get("/", protect, getNotifications);
router.get("/:id", protect, getNotificationById);
router.post("/", protect, createNotification);   
router.put("/:id/seen", protect, markAsSeen);
router.delete("/:id", protect, deleteNotification);

module.exports = router;
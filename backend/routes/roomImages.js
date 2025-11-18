// backend/routes/roomImages.js
const express = require('express');
const router = express.Router();
const roomImagesController = require('../controller/roomImages');

// Өрөөний зургууд
router.get('/rooms/:roomId/images', roomImagesController.getRoomImages);
router.post('/rooms/:roomId/images', roomImagesController.addRoomImage);
router.delete('/rooms/:roomId/images/:imageId', roomImagesController.deleteRoomImage);

module.exports = router;
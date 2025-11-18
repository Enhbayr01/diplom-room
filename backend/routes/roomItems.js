
const express = require('express');
const router = express.Router();
const roomItemsController = require('../controller/roomItems');


router.get('/rooms/:roomId/items', roomItemsController.getRoomItems);
router.post('/rooms/:roomId/items', roomItemsController.addRoomItem);
router.put('/rooms/items/:itemId', roomItemsController.updateRoomItem);
router.delete('/rooms/:roomId/items/:itemId', roomItemsController.deleteRoomItem);

module.exports = router;
// backend/controller/roomItems.js
const { RoomItem, Room } = require("../models");

exports.getRoomItems = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    
    // Өрөө байгаа эсэхийг шалгах
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }

    const items = await RoomItem.findAll({
      where: { room_id: roomId },
      attributes: ["id", "item_name", "quantity"]
    });

    res.json(items);
  } catch (e) {
    res.status(500).json({ 
      message: "Өрөөний тавилгууд татахад алдаа", 
      error: e.message 
    });
  }
};

exports.addRoomItem = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { item_name, quantity } = req.body;

    // Өрөө байгаа эсэхийг шалгах
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }

    // Шаардлагатай талбарууд
    if (!item_name) {
      return res.status(400).json({ message: "Тавилгын нэр шаардлагатай" });
    }

    const newItem = await RoomItem.create({
      room_id: roomId,
      item_name: item_name,
      quantity: quantity || 1
    });

    res.status(201).json({
      message: "Тавилгыг амжилттай нэмлээ",
      item: newItem
    });

  } catch (e) {
    res.status(400).json({ 
      message: "Тавилгыг нэмэхэд алдаа", 
      error: e.message 
    });
  }
};

exports.updateRoomItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { item_name, quantity } = req.body;

    const [updatedCount] = await RoomItem.update(
      { item_name, quantity },
      { where: { id: itemId } }
    );

    if (!updatedCount) {
      return res.status(404).json({ message: "Тавилга олдсонгүй" });
    }

    const updatedItem = await RoomItem.findByPk(itemId);
    res.json({
      message: "Тавилга амжилттай шинэчлэгдлээ",
      item: updatedItem
    });

  } catch (e) {
    res.status(400).json({ 
      message: "Тавилгыг шинэчлэхэд алдаа", 
      error: e.message 
    });
  }
};

exports.deleteRoomItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const deletedCount = await RoomItem.destroy({
      where: { id: itemId }
    });

    if (!deletedCount) {
      return res.status(404).json({ message: "Тавилга олдсонгүй" });
    }

    res.json({ message: "Тавилга амжилттай устгагдлаа" });

  } catch (e) {
    res.status(500).json({ 
      message: "Тавилга устгахад алдаа", 
      error: e.message 
    });
  }
};
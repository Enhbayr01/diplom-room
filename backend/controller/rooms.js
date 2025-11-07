const { Room, RoomCategory, RoomImage, RoomItem } = require("../models");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [
        { model: RoomCategory, attributes: ["id", "name"] },
        { model: RoomImage, attributes: ["id", "image_url"] },
        { model: RoomItem, attributes: ["id", "item_name", "quantity"] },
      ],
    });
    res.json(rooms);
  } catch (e) {
    res.status(500).json({ message: "Өрөөнүүд татахад алдаа", error: e.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id, {
      include: [
        { model: RoomCategory, attributes: ["id", "name"] },
        { model: RoomImage, attributes: ["id", "image_url"] },
        { model: RoomItem, attributes: ["id", "item_name", "quantity"] },
      ],
    });
    if (!room) return res.status(404).json({ message: "Өрөө олдсонгүй" });
    res.json(room);
  } catch (e) {
    res.status(500).json({ message: "Өрөө авахад алдаа", error: e.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (e) {
    res.status(400).json({ message: "Өрөө нэмэхэд алдаа", error: e.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const [updatedCount] = await Room.update(req.body, { 
      where: { id: req.params.id } 
    });
    
    if (!updatedCount) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }
    
    const updatedRoom = await Room.findByPk(req.params.id, {
      include: [
        { model: RoomCategory, attributes: ["id", "name"] },
        { model: RoomImage, attributes: ["id", "image_url"] },
        { model: RoomItem, attributes: ["id", "item_name", "quantity"] },
      ],
    });
    
    res.json(updatedRoom);
  } catch (e) {
    res.status(400).json({ message: "Өрөө шинэчлэхэд алдаа", error: e.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deletedCount = await Room.destroy({ 
      where: { id: req.params.id } 
    });
    
    if (!deletedCount) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }
    
    res.json({ message: "Өрөө амжилттай устгагдлаа" });
  } catch (e) {
    res.status(500).json({ message: "Өрөө устгахад алдаа", error: e.message });
  }
};
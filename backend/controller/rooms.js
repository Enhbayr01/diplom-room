const { Room, RoomImage, RoomItem } = require("../models");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [
        { model: RoomImage, 
          as: 'roomImages',
          attributes: ["id", "image_url"] },
        { model: RoomItem, 
          as: 'roomItems',
          attributes: ["id", "item_name", "quantity"] },
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
        { model: RoomImage, as: 'roomImages', attributes: ["id", "image_url"] },
        { model: RoomItem, as: 'roomItems', attributes: ["id", "item_name", "quantity"] },
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
        { model: RoomImage, as: 'roomImages', attributes: ["id", "image_url"] },
        { model: RoomItem, as: 'roomItems', attributes: ["id", "item_name", "quantity"] },
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

exports.updateRoomStatus = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { status } = req.body;

    // Status шалгах
    if (!status || !['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({ 
        message: "Status 'ACTIVE' эсвэл 'INACTIVE' байх ёстой" 
      });
    }

    const [updatedCount] = await Room.update(
      { status: status },
      { where: { id: roomId } }
    );

    if (!updatedCount) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }

    const updatedRoom = await Room.findByPk(roomId, {
      include: [
        { 
          model: RoomImage, 
          as: 'roomImages',
          attributes: ["id", "image_url"] 
        },
        { 
          model: RoomItem, 
          as: 'roomItems',
          attributes: ["id", "item_name", "quantity"] 
        }
      ]
    });

    res.json({
      message: "Өрөөний статус амжилттай шинэчлэгдлээ",
      room: updatedRoom
    });

  } catch (e) {
    console.error("Өрөөний статус шинэчлэх алдаа:", e);
    res.status(500).json({ 
      message: "Өрөөний статус шинэчлэхэд алдаа", 
      error: e.message 
    });
  }
};
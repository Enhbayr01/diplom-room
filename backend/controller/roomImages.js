// backend/controller/roomImages.js - ШИНЭЧЛЭХ
const { RoomImage, Room } = require("../models");

exports.getRoomImages = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    
    // Өрөө байгаа эсэхийг шалгах
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }

    const images = await RoomImage.findAll({
      where: { room_id: roomId },
      attributes: ["id", "image_url"] 
    });

    res.json(images);
  } catch (e) {
    res.status(500).json({ 
      message: "Өрөөний зургууд татахад алдаа", 
      error: e.message 
    });
  }
};

exports.addRoomImage = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { image_url } = req.body; 

    // Өрөө байгаа эсэхийг шалгах
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Өрөө олдсонгүй" });
    }

    if (!image_url) {
      return res.status(400).json({ message: "Зургийн URL шаардлагатай" });
    }

    const newImage = await RoomImage.create({
      room_id: roomId,
      image_url: image_url
    });

    res.status(201).json({
      message: "Зургийг амжилттай нэмлээ",
      image: newImage
    });

  } catch (e) {
    res.status(400).json({ 
      message: "Зургийг нэмэхэд алдаа", 
      error: e.message 
    });
  }
};

exports.deleteRoomImage = async (req, res) => {
  try {
    const imageId = req.params.imageId;

    const deletedCount = await RoomImage.destroy({
      where: { id: imageId }
    });

    if (!deletedCount) {
      return res.status(404).json({ message: "Зураг олдсонгүй" });
    }

    res.json({ message: "Зураг амжилттай устгагдлаа" });

  } catch (e) {
    res.status(500).json({ 
      message: "Зураг устгахад алдаа", 
      error: e.message 
    });
  }
};
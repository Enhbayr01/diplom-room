const { Op } = require("sequelize");
const { Order, Room, User } = require("../models");

// Бүгд
exports.getAllOrders = async (req, res) => {
  try {
    const rows = await Order.findAll({
      include: [
        { model: Room, attributes: ["id", "room_number", "location"] },
        { model: User, attributes: ["id", "username", "email"] },
      ],
      order: [["order_date", "DESC"]],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Захиалгууд татахад алдаа", error: e.message });
  }
};

// Нэг
exports.getOrderById = async (req, res) => {
  try {
    const row = await Order.findByPk(req.params.id, {
      include: [
        { model: Room, attributes: ["id", "room_number", "location"] },
        { model: User, attributes: ["id", "username", "email"] },
      ],
    });
    if (!row) return res.status(404).json({ message: "Захиалга олдсонгүй" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ message: "Захиалга авахад алдаа", error: e.message });
  }
};

// Үүсгэх (давхцал шалгана)
exports.createOrder = async (req, res) => {
  try {
    const { room_id, user_id, start_time, end_time, purpose } = req.body;

    // давхцал шалгах: newStart < end && newEnd > start
    const overlap = await Order.findOne({
      where: {
        room_id,
        status: { [Op.in]: ["pending", "approved"] },
        [Op.and]: [{ start_time: { [Op.lt]: end_time } }, { end_time: { [Op.gt]: start_time } }],
      },
    });
    if (overlap) {
      return res.status(409).json({ message: "Энэ цагт өмнө захиалга байна (давхцал)!" });
    }

    const created = await Order.create({
      room_id,
      user_id,
      start_time,
      end_time,
      purpose,
      status: "pending",
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: "Захиалга үүсгэхэд алдаа", error: e.message });
  }
};

// Шинэчлэх (төлөв/цаг өөрчлөхөд мөн давхцал шалгаж болно)
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = { ...req.body };

    if (payload.start_time && payload.end_time && payload.room_id) {
      const overlap = await Order.findOne({
        where: {
          id: { [Op.ne]: id },
          room_id: payload.room_id,
          status: { [Op.in]: ["pending", "approved"] },
          [Op.and]: [
            { start_time: { [Op.lt]: payload.end_time } },
            { end_time: { [Op.gt]: payload.start_time } },
          ],
        },
      });
      if (overlap) return res.status(409).json({ message: "Давхцал илэрлээ!" });
    }

    const [n] = await Order.update(payload, { where: { id } });
    if (!n) return res.status(404).json({ message: "Захиалга олдсонгүй" });
    const row = await Order.findByPk(id);
    res.json(row);
  } catch (e) {
    res.status(400).json({ message: "Захиалга шинэчлэхэд алдаа", error: e.message });
  }
};

// Устгах
exports.deleteOrder = async (req, res) => {
  try {
    const n = await Order.destroy({ where: { id: req.params.id } });
    if (!n) return res.status(404).json({ message: "Захиалга олдсонгүй" });
    res.json({ message: "Устгалаа" });
  } catch (e) {
    res.status(500).json({ message: "Захиалга устгахад алдаа", error: e.message });
  }
};

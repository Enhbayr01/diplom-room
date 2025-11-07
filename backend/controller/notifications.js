const { Notification, User } = require("../models");

exports.getNotifications = async (req, res) => {
  try {
    const rows = await Notification.findAll({
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Мэдэгдэл татахад алдаа", error: e.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const row = await Notification.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "username", "email"] }],
    });
    if (!row) return res.status(404).json({ message: "Мэдэгдэл олдсонгүй" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ message: "Мэдэгдэл авахад алдаа", error: e.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const created = await Notification.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: "Мэдэгдэл үүсгэхэд алдаа", error: e.message });
  }
};

exports.markAsSeen = async (req, res) => {
  try {
    const [n] = await Notification.update(
      { status: "seen" },
      { where: { id: req.params.id } }
    );
    if (!n) return res.status(404).json({ message: "Мэдэгдэл олдсонгүй" });
    const row = await Notification.findByPk(req.params.id);
    res.json(row);
  } catch (e) {
    res.status(400).json({ message: "Мэдэгдэл шинэчлэхэд алдаа", error: e.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const n = await Notification.destroy({ where: { id: req.params.id } });
    if (!n) return res.status(404).json({ message: "Мэдэгдэл олдсонгүй" });
    res.json({ message: "Устгалаа" });
  } catch (e) {
    res.status(500).json({ message: "Мэдэгдэл устгахад алдаа", error: e.message });
  }
};

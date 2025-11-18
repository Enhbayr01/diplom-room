// backend/controller/users.js
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Хэрэглэгчдийн жагсаалт татахад алдаа", error: e.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!u) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    res.json(u);
  } catch (e) {
    res.status(500).json({ message: "Хэрэглэгч авахад алдаа", error: e.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = { ...req.body };
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    const [n] = await User.update(payload, { where: { id } });
    if (!n) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    const u = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    res.json(u);
  } catch (e) {
    res.status(400).json({ message: "Хэрэглэгч шинэчлэхэд алдаа", error: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const n = await User.destroy({ where: { id: req.params.id } });
    if (!n) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    res.json({ message: "Устгалаа" });
  } catch (e) {
    res.status(500).json({ message: "Хэрэглэгч устгахад алдаа", error: e.message });
  }
};

  
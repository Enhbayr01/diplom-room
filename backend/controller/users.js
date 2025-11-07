//backend/controller/users.js
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

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, phone, role, company_name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const created = await User.create({
      username,
      email,
      password: hash,
      firstname,
      lastname,
      phone,
      role,
      company_name,
    });
    const plain = created.get({ plain: true });
    delete plain.password;
    res.status(201).json(plain);
  } catch (e) {
    res.status(400).json({ message: "Хэрэглэгч үүсгэхэд алдаа", error: e.message });
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

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const u = await User.findOne({ where: { username } });
    if (!u) return res.status(401).json({ message: "Нэвтрэх нэр/нууц үг буруу" });
    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(401).json({ message: "Нэвтрэх нэр/нууц үг буруу" });
    const plain = u.get({ plain: true });
    delete plain.password;
    // Хэрэв JWT хэрэглэх бол энд token үүсгээд буцаана.
    res.json({ user: plain });
  } catch (e) {
    res.status(500).json({ message: "Нэвтрэхэд алдаа", error: e.message });
  }
};

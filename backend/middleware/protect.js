// middleware/protect.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
  try {
    // 1. Token шалгах
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Токен байхгүй байна' });
    }

    // 2. Token баталгаажуулах
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Хэрэглэгч олох
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    // 4. Request-д хэрэглэгчийг оноох
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Токен буруу байна' });
  }
};

module.exports = protect;
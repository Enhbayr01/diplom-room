// controller/auth.js
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Email, password байгаа эсэхийг шалгах
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Имэйл болон нууц үгээ оруулна уу'
      });
    }

    // 2. Хэрэглэгчийг олох (password-ийг оролцуулах)
    const user = await User.findOne({ 
      where: { email } 
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Имэйл эсвэл нууц үг буруу байна'
      });
    }

    // 3. Нууц үг шалгах
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Имэйл эсвэл нууц үг буруу байна'
      });
    }

    // 4. Token үүсгэх
    const token = user.getSignedJwtToken();

    // 5. Хариу илгээх
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Нэвтрэх алдаа:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа',
      error: error.message
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, phone } = req.body;

    // 1. Шинэ хэрэглэгч үүсгэх
    const user = await User.create({
      username,
      email,
      password, // Model дээр hook ашиглан автоматаар hash-лэгдэнэ
      firstname,
      lastname,
      phone
    });

    // 2. Token үүсгэх
    const token = user.getSignedJwtToken();

    // 3. Хариу илгээх
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Бүртгэлийн алдаа:', error);
    
    // 4. Алдааны төрлөөр ялгах
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Имэйл эсвэл хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа',
      error: error.message
    });
  }
};
const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Шаардлагатай талбаруудыг шалгах
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Имэйл болон нууц үг оруулна уу"
      });
    }

    // Хэрэглэгчийг имэйлээр хайх
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Имэйл эсвэл нууц үг буруу байна"
      });
    }

    // Нууц үг шалгах
    const isPasswordMatch = await user.checkPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Имэйл эсвэл нууц үг буруу байна"
      });
    }

    // JWT token үүсгэх
    const token = user.getSignedJwtToken();

    // Хэрэглэгчийн мэдээлэл (нууц үггүй)
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      company_name: user.company_name,
      reg_date: user.reg_date
    };

    res.status(200).json({
      success: true,
      message: "Амжилттай нэвтэрлээ",
      token: token,
      user: userResponse
    });

  } catch (error) {
    console.error("Нэвтрэх алдаа:", error);
    res.status(500).json({
      success: false,
      message: "Серверийн алдаа",
      error: error.message
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, phone, company_name, role } = req.body;

    // Шаардлагатай талбаруудыг шалгах
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Нэр, имэйл, нууц үг шаардлагатай"
      });
    }

    // Хэрэглэгч аль хэдийн бүртгэгдсэн эсэхийг шалгах
    const existingUser = await User.findOne({
      where: {
        $or: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Имэйл эсвэл нэр аль хэдийн бүртгэгдсэн байна"
      });
    }

    // Шинэ хэрэглэгч үүсгэх
    const user = await User.create({
      username,
      email,
      password,
      phone: phone || null,
      company_name: company_name || null,
      role: role || "CUSTOMER"
    });

    // JWT token үүсгэх
    const token = user.getSignedJwtToken();

    // Хэрэглэгчийн мэдээлэл (нууц үггүй)
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      company_name: user.company_name,
      reg_date: user.reg_date
    };

    res.status(201).json({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ",
      token: token,
      user: userResponse
    });

  } catch (error) {
    console.error("Бүртгэлийн алдаа:", error);
    res.status(500).json({
      success: false,
      message: "Серверийн алдаа",
      error: error.message
    });
  }
};
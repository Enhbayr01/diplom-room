const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
exports.getInfo = asyncHandler(async (req, res, next) => {
  const { email, userId: id } = req;
  if (!email || !id) {
    throw new MyError("Таны мэдээлэл дутуу байна", 400);
  }
  const user = await req.db.users.findOne({
    where: {
      id,
      email,
    },
  });
  res.status(200).json({
    message: "",
    body: { user },
  });
});

exports.signInUser = asyncHandler(async (req, res, next) => {
  const { password, phone } = req.body;
  if (!password || !phone) {
    throw new MyError("Дугаар эсвэл нууц үгээ оруулна уу", 400);
  }
  const user = await req.db.users.findOne({
    where: { phone },
  });
  if (!user) {
    throw new MyError("Таны нэвтрэх нэр эсхүл нууц үг буруу байна", 400);
  }
  const checkPass = await user.CheckPass(password);
  if (!checkPass) {
    throw new MyError("Таны нэвтрэх нэр эсхүл нууц үг буруу байна", 400);
  }
  res.status(200).json({
    message: "",
    body: {
      token: user.getJsonWebToken(),
      user: user,
    },
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.users.create({ ...req.body });
  if (!user) {
    throw new MyError("Бүртгэх явцад алдаа гарлаа", 400);
  }
  res.status(200).json({
    message: "",
    body: {
      token: user.getJsonWebToken(),
      user: user,
    },
  });
});

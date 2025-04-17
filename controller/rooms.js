const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
exports.getRooms = asyncHandler(async (req, res, next) => {});

exports.getRoom = asyncHandler(async (req, res, next) => {});
exports.updateRoom = asyncHandler(async (req, res, next) => {});
exports.createRoom = asyncHandler(async (req, res, next) => {
  const { body, userId } = req
  const room = await req.db.rooms.create({ ...body, userId });
  if (!room) {
    throw new MyError("Нэмэх явцад алдаа гарлаа", 400);
  }
  res.status(200).json({
    message: "Амжилттай",
    body: {
      room,
    },
  });
});

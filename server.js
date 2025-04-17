const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
var rfs = require("rotating-file-stream");
const logger = require("./middleware/logger");
const colors = require("colors")
// route import
const UserRouter = require("./routes/users")
const RoomRouter = require("./routes/room")


const injectDb = require("./middleware/injectDb");
const cors = require("cors");
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });
const db = require("./config/db-mysql");

const app = express();

var accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "log"),
  });

// Body parser
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
// Routes user
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/room", RoomRouter)
app.use(errorHandler);

db.sequelize
  .sync()
  .then((result) => {
    console.log("sync hiigdlee...");
  })
  .catch((err) => console.log(err));

  const server = app.listen(
    process.env.PORT,
    console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `.rainbow)
  );
  
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
    server.close(() => {
      process.exit(1);
    });
  });
  
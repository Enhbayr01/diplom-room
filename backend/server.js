const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");

// Орчин
dotenv.config({ path: "./config/config.env" });

// Sequelize models нэгтгэсэн index
const { sequelize } = require("./models");

const app = express();

// --- CORS тохируулга - ЗӨВХӨН localhost:3000-д зөвшөөрөх
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

// --- Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(logger);
app.use(morgan("dev"));


// Preflight request-уудыг зөвшөөрөх
app.options('*', cors(corsOptions));

// --- Routes-уудыг эхлээд хувьсагч болгон авах
const usersRouter = require("./routes/user");
const roomsRouter = require("./routes/room");
const ordersRouter = require("./routes/order");
const notificationsRouter = require("./routes/notification");
const authRouter = require("./routes/auth");


// Route-уудыг ашиглах
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/auth", authRouter);
app.use('/api', require('./routes/roomImages'));
app.use('/api', require('./routes/roomItems'));



const protect = require("./middleware/protect");
app.use("/api/orders", protect); // Эхлээд protect, дараа нь route
app.use("/api/orders", ordersRouter);

app.use("/api/notifications", protect); // Эхлээд protect, дараа нь route  
app.use("/api/notifications", notificationsRouter);
// ALWAYS last
app.use(errorHandler);

// --- Bootstrap
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB холболт амжилттай!");
    await sequelize.sync();
    console.log("✅ Models sync хийгдлээ...");

    const server = app.listen(PORT, () =>
      console.log(`🚀 Express сервер ${PORT} порт дээр аслаа...`.rainbow)
    );

    process.on("unhandledRejection", (err) => {
      console.log(`Алдаа гарлаа: ${err.message}`.underline.red.bold);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("❌ DB алдаа:", err.message);
    process.exit(1);
  }
})();
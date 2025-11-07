const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "Room_reservation",
  waitForConnections: true,
  connectionLimit: 10,
  // Доорх нь сонголт, гэхдээ их тустай:
  charset: "utf8mb4_general_ci",
  dateStrings: true,          // DATETIME-ийг string болгож буцаана
  timezone: "Z"               // эсвэл "+08:00" гэх мэт
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL холболт амжилттай!");
  } catch (err) {
    console.error("❌ MySQL холболт амжилтгүй:", err.message);
  }
}

// Аюулгүй хаалт (Ctrl+C дарахад)
process.on("SIGINT", async () => {
  try {
    await pool.end();
  } finally {
    process.exit(0);
  }
});

module.exports = { pool, testConnection };

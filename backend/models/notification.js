const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: DataTypes.ENUM("reservation", "approval", "rejection", "cancellation"),
        allowNull: false,
      },
      message: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.ENUM("seen", "unseen"), allowNull: false, defaultValue: "unseen" },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "notification",
      timestamps: false,
      underscored: true,
    }
  );

  return Notification;
};

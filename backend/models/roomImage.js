const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomImage = sequelize.define(
    "RoomImage",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      image_url: { type: DataTypes.STRING(255), allowNull: false },
      room_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "room_images",
      timestamps: false,
      underscored: true,
    }
  );

  return RoomImage;
};

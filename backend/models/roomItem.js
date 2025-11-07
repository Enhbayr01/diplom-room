const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomItem = sequelize.define(
    "RoomItem",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      item_name: { type: DataTypes.STRING(60), allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      room_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "room_items",
      timestamps: false,
      underscored: true,
    }
  );

  return RoomItem;
};

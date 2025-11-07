const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomCategory = sequelize.define(
    "RoomCategory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    },
    {
      tableName: "room_category",
      timestamps: false,
      underscored: true,
    }
  );

  return RoomCategory;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define(
    "Room",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
      room_number: { 
        type: 
        DataTypes.STRING(20), 
        allowNull: false, 
        unique: true },
      location: { 
        type: DataTypes.STRING(100) },
      capacity: { 
        type: DataTypes.INTEGER, 
        allowNull: false },
      description: { 
        type: DataTypes.TEXT },
      status: { 
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"), 
        defaultValue: "ACTIVE" },
      category_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true },
    },
    {
      tableName: "room",
      timestamps: false,
      underscored: true,
    }
  );

  return Room;
};

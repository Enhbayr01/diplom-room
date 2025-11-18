// backend/models/roomImage.js - ШИНЭЧЛЭХ
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomImage = sequelize.define(
    "RoomImage",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      room_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      image_url: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      }
    },
    {
      tableName: "room_images",
      timestamps: false,
      underscored: true,
    }
  );

  RoomImage.associate = function(models) {
    RoomImage.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room'
    });
  };

  return RoomImage;
};
// backend/models/room.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define(
    "Room",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      room_number: { 
        type: DataTypes.STRING(20), 
        allowNull: false, 
        unique: true 
      },
      location: { 
        type: DataTypes.STRING(100) 
      },
      capacity: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      description: { 
        type: DataTypes.TEXT 
      },
      status: { 
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"), 
        defaultValue: "ACTIVE" 
      },
      category: { 
        type: DataTypes.STRING, 
        allowNull: true 
      },
    },
    {
      tableName: "room",
      timestamps: false,
      underscored: true,
    }
  );

  // ASSOCIATE FUNC НЭМЭХ
  Room.associate = function(models) {
    Room.hasMany(models.RoomImage, {
      foreignKey: 'room_id',
      as: 'roomImages'
    });
    Room.hasMany(models.RoomItem, {
      foreignKey: 'room_id',
      as: 'roomItems'
    });
    Room.hasMany(models.Order, {
      foreignKey: 'room_id',
      as: 'orders'
    });
  };

  return Room;
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomItem = sequelize.define(
    "RoomItem",
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
      item_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
      },
      quantity: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1 
      }
    },
    {
      tableName: "room_items",
      timestamps: false,
    }
  );

  RoomItem.associate = function(models) {
    RoomItem.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room'
    });
  };

  return RoomItem;
};
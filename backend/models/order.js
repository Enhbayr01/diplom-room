const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      start_time: { type: DataTypes.DATE, allowNull: false },
      end_time: { type: DataTypes.DATE, allowNull: false },
      order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      purpose: { type: DataTypes.STRING(200) },
      room_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "orders",
      timestamps: false,
      underscored: true,
      validate: {
        timeOrder() {
          if (this.start_time && this.end_time && !(this.start_time < this.end_time)) {
            throw new Error("start_time нь end_time-ээс бага байх ёстой");
          }
        },
      },
    }
  );
  
Order.associate = function(models) {
  Order.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  Order.belongsTo(models.Room, {
    foreignKey: 'room_id',
    as: 'room'
  });
};
  return Order;
};

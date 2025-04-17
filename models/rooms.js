module.exports = function (sequelize, DataTypes) {
    const Rooms = sequelize.define(
      "rooms",
      {
        id: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        roomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        capacity:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description:{
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId:{
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        }
      },
      {
        tableName: "rooms",
        timestamps: true,
      }
    )
    return Rooms
}
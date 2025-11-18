// models/index.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Sequelize холболт
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Model-уудыг ачаалах
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Room = require('./room')(sequelize, Sequelize.DataTypes);
const RoomImage = require('./roomImage')(sequelize, Sequelize.DataTypes);
const RoomItem = require('./roomItem')(sequelize, Sequelize.DataTypes);
const Order = require('./order')(sequelize, Sequelize.DataTypes);
const Notification = require('./notification')(sequelize, Sequelize.DataTypes);

// Model-уудыг нэгтгэх
const models = {
  User,
  Room,
  RoomImage,
  RoomItem,
  Order,
  Notification
};

// Relation-уудыг тохируулах
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
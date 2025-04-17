/* jshint indent: 1 */
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(250),
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg:"Имейл заавал байх ёстой"
          },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Нууц үг хоосон байна.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { min: 8 },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['customer', 'admin'],
        defaultValue:"customer"
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  )
//   function
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.beforeUpdate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Generate JWT
  User.prototype.getJsonWebToken = function () {
    console.log((this.email, this.id).red)
    const token = jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      process.env.JWT_SECRET
    );
    return token;
  };

  // Check password
  User.prototype.CheckPass = async function (pass) {
    return await bcrypt.compare(pass, this.password);
  };

  User.prototype.generatePasswordChangeToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };
  return User
};

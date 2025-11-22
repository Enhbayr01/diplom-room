const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      username: { 
        type: DataTypes.STRING(40), 
        allowNull: false, 
        unique: true 
      },
      password: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      email: { 
        type: DataTypes.STRING(120), 
        allowNull: false, 
        unique: true 
      },
      phone: { 
        type: DataTypes.STRING(15) 
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "CUSTOMER"),
        allowNull: false,
        defaultValue: "CUSTOMER",
      },
      company_name: { 
        type: DataTypes.STRING(80) 
      },
      reg_date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      resetPasswordExpire: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: "users",
      timestamps: false,
      underscored: true,
    }
  );

 
User.beforeCreate(async (user) => {
  try {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  } catch (error) {
    console.error('Password hash алдаа:', error);
    throw error;
  }
});
  User.prototype.getSignedJwtToken = function () {
    const token = jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );
    return token;
  };

  // Check password
  User.prototype.checkPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  User.prototype.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };

  return User;
};
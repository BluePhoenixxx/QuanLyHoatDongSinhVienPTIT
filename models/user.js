

var bcrypt = require('bcryptjs');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: 'role_id', as: 'UserRole'});
      User.belongsTo(models.Status_Account, {foreignKey: 'status_id', as: 'status'});
      User.hasMany(models.Activity, { foreignKey: 'creater_id', as: 'activities', onDelete: 'CASCADE'});
      User.hasOne(models.Student, {foreignKey :'account_id', as : 'account', onDelete : 'CASCADE'})
      // User.hasMany(models.Notification, {foreignKey :'user_id', as : 'notifications', onDelete : 'CASCADE'})
      User.hasMany(models.Register_Act,{foreignKey: 'act_id', as: 'register'})
      
    }
  }
  User.init({
    username: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status_id: DataTypes.STRING,
    otp : DataTypes.STRING,
    otpExpires: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  return User;
};
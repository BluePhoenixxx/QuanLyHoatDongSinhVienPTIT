'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {

    static associate(models) {

      Notification.belongsTo(models.Object, {foreignKey: 'object_id', as: 'object'});
      Notification.belongsTo(models.Activity, {foreignKey: 'act_id', as: 'activity'});
      Notification.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    }
  }
  Notification.init({
    message: DataTypes.STRING,
    object_id: DataTypes.INTEGER,
    act_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
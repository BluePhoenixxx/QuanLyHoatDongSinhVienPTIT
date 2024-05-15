'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Object, {foreignKey: 'object_id', as: 'object'});
      Notification.belongsTo(models.Activity, {foreignKey: 'act_id', as: 'activity'});
      
    }
  }
  Notification.init({
    object_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    create_time: DataTypes.DATE,
    obj_id: DataTypes.INTEGER,
    act_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
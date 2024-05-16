'use strict';
const {
  Model,
  DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User, {foreignKey: 'creater_id', as: 'creater'});
      Activity.belongsTo(models.User, {foreignKey: 'audit_id', as: 'audit'});
      Activity.belongsTo(models.Status_Act, {foreignKey: 'act_status', as: 'status'});
    }
  }
  Activity.init({
    act_name: DataTypes.STRING,
    act_description: DataTypes.STRING,
    act_address: DataTypes.STRING,
    act_price: DataTypes.STRING,
    act_status: DataTypes.INTEGER,
    act_time : DataTypes.DATE,
    amount : DataTypes.INTEGER,
    creater_id: DataTypes.INTEGER,
    audit_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
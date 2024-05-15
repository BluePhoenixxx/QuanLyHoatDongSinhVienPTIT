'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Register_Act extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Register_Act.belongsTo(models.Activity, {foreignKey: 'act_id', as: 'activity'});
      Register_Act.belongsTo(models.Status_Act, {foreignKey: 'status_id', as: 'status'});
      Register_Act.belongsTo(models.User, {foreignKey: 'act_account', as: 'account'});
    }
  }
  Register_Act.init({
    act_id: DataTypes.INTEGER,
    act_account: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Register_Act',
  });
  return Register_Act;
};
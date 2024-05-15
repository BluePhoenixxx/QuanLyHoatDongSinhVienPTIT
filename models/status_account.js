'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status_Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status_Account.hasMany(models.User, {foreignKey: 'status_id', as: 'users'});
      
    }
  }
  Status_Account.init({
    Status_Act_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status_Account',
  });
  return Status_Account;
};
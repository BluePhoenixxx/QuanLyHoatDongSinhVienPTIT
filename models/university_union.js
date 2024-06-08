'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class University_Union extends Model {

    static associate(models) {
      University_Union.belongsTo(models.User, {foreignKey: 'account_id', as: 'account'});
    }
  }
  University_Union.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    account_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    position: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'University_Union',
  });
  return University_Union;
};
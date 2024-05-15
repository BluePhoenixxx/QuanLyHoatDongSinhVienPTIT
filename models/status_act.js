'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status_Act extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status_Act.hasMany(models.Register_Act, {foreignKey: 'status_id', as: 'register_acts'});
    }
  }
  Status_Act.init({
    Status_Act_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status_Act',
  });
  return Status_Act;
};
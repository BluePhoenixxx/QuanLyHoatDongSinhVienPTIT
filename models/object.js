'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Object extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Object.init({
    object_id: DataTypes.INTEGER,
    obj_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Object',
  });
  return Object;
};
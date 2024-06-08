'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    
    static associate(models) {
      Class.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
    }
  }
  Class.init({
    class_id: DataTypes.STRING,
    class_name: DataTypes.STRING,
    department_id: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
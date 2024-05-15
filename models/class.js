'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
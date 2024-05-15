'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Class, {foreignKey: 'class_id', as: 'class'});
      Student.belongsTo(models.User, {foreignKey: 'account_id', as: 'account'});

    }
  }
  Student.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    account_id: DataTypes.INTEGER,
    class_id: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    position: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender_id: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
    autoIncrement: false,
  });
  return Student;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RolePermission.belongsTo(models.Role, {foreignKey: 'role_id', as: 'role'});
      RolePermission.belongsTo(models.Permission, {foreignKey: 'perm_id', as: 'permission'});
    }
  }
  RolePermission.init({
    role_id: DataTypes.INTEGER,
    perm_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};
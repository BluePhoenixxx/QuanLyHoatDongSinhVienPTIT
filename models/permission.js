'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Permission.belongsToMany(models.Role, { through: 'RolePermission', as: 'roles', foreignKey: 'perm_id' });
      Permission.belongsToMany(models.Role, { through: 'RolePermission', as: 'RolePermissions',  foreignKey: 'perm_id'});
    }
  }
  Permission.init({
    perm_name: DataTypes.STRING,
    perm_description: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
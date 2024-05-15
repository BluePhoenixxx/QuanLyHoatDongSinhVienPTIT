'use strict';
const {Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
      role_name: DataTypes.STRING,
      role_description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
  }, {});
  Role.associate = function(models) {
      models.Role.hasMany(models.User ,{foreignKey: 'role_id', as : 'UserRole'});
      // models.Role.belongsToMany(models.Permission, {through: 'RolePermission',as: 'permissions',foreignKey: 'id'});
      Role.belongsToMany(models.Permission, { through: 'RolePermission', as: 'RolePermissions',foreignKey: 'role_id' });
  };
  return Role;
};
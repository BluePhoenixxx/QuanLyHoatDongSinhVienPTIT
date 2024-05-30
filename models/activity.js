'use strict';
const {
  Model,
  DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User, {foreignKey: 'creater_id', as: 'creater'});
      Activity.belongsTo(models.User, {foreignKey: 'audit_id', as: 'audit'});
      Activity.belongsTo(models.Status_Act, {foreignKey: 'act_status', as: 'status'})
      Activity.hasMany(models.Register_Act,{foreignKey: 'act_id', as: 'register'})
    }
  }
  Activity.init({
    act_name: DataTypes.STRING,
    act_description: DataTypes.STRING,
    act_address: DataTypes.STRING,
    act_price: DataTypes.STRING,
    act_status: DataTypes.INTEGER,
    act_time : DataTypes.DATE,
    amount : DataTypes.INTEGER,
    creater_id: DataTypes.INTEGER,
    audit_id: DataTypes.INTEGER,
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Activity',
  });

  // Định nghĩa hook sau khi cập nhật
  Activity.afterUpdate(async (activity, options) => {
    const changedAttributes = activity.changed();
    if (changedAttributes.includes('act_status') && activity.act_status === 4) {
      try {
        await Notification.create({
          user_id: activity.creater_id, 
          act_id: activity.id,
          object_id: 1,
          message: `Hoạt động "${act_name}" của bạn đã bị hủy`
        });
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
  });


  return Activity;
};
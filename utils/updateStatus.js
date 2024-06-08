const { User, Student, Notification, Activity ,Register_Act} = require('../models')

const variable = require('../utils/variable.js');
const { sequelize } = require('../models');
const { Sequelize, Op } = require('sequelize');
const express = require('express');
const router = express.Router();

const Helper = require('../utils/helper');
const helper = new Helper();
const { where } = require('sequelize');


async function updateActivityStatus() {
    const today = new Date();
    const OneWeekAgo = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày để so sánh chính xác
    OneWeekAgo.setDate(today.getDate() - 7);
    OneWeekAgo.setHours(0, 0, 0, 0);
   

    // Kiểm tra các hoạt động không đủ số lượng sinh viên đăng ký sau 3 ngày
    const threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(today.getDate() - 3);
    


     // Cập nhật các hoạt động đang chờ xét duyệt nhưng đã qua thời hạn
    const activitie_oneWeek = await Activity.findAll({
        where: {
            act_time: { [Op.gte]: OneWeekAgo },
            act_status: variable.status_act_wait
        }
    });
    await activitie_oneWeek.forEach(activitity => {
        activitity.update({ act_status: variable.status_act_reject });
        
    });


    // Cập nhật các hoạt động diễn ra vào hôm nay 
    const activities_today = await Activity.findAll({
        where: {
            act_time: { [Op.eq]: today },
            act_status: variable.status_act_accept
        }
    });
    await activities_today.forEach(activitity => {
        activitity.update({ act_status: variable.status_act_ongoing });
    })
    



    // Cập nhật các hoạt động đã qua ngày tổ chức 
    const activities_pre = await Activity.findAll({
        where: {
            act_time: { [Op.lte]: today },
            act_status: variable.status_act_ongoing
        }
    });
    await activities_pre.forEach(activitity => {
        activitity.update({ act_status: variable.status_act_end });
    })
   

    const activities = await Activity.findAll({
        where: {
            act_time: { [Op.lte]: threeDaysAgo },
            act_status: variable.status_act_accept
        }
    });

    // Cập nhật các hoạt động đang chờ xét duyệt nhưng không đã động
    await Promise.all(activities.map(async (activity) => {
        const count = await Register_Act.count({
            where: {
                status_id: variable.status_act_accept,
                act_id: activity.id
            }
        });

        if (count < activity.amount) {
            // Update the status of the activity to 'rejected'
            await activity.update({ act_status: variable.status_act_reject });

            // Get the activity name
            const activityName = activity.act_name;

            try {
                await Notification.create({
                    user_id: activity.creater_id,
                    act_id: activity.id,
                    object_id: variable.object_create,
                    message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
                });
            } catch (error) {
                console.error('Error creating notification:', error);
            }    
        }
    }));

    await Promise.all(activities.map(async (activity) => {
        const count = await Register_Act.count({
            where: {
                status_id: variable.status_act_accept,
                act_id: activity.id
            }
        });

        if (count < activity.amount) {
            // Update the status of the activity to 'rejected'
            await activity.update({ act_status: variable.status_act_reject });

            // Get the activity name
            const activityName = activity.act_name;

            try {
                await Notification.create({
                    user_id: activity.creater_id,
                    act_id: activity.id,
                    object_id: variable.object_create,
                    message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
                });
            } catch (error) {
                console.error('Error creating notification:', error);
            }    
        }
    }));

    await Promise.all(activities.map(async (activity) => {
        const count = await Register_Act.count({
            where: {
                status_id: variable.status_act_accept,
                act_id: activity.id
            }
        });

        if (count < activity.amount) {
            // Update the status of the activity to 'rejected'
            await activity.update({ act_status: variable.status_act_reject });

            // Get the activity name
            const activityName = activity.act_name;

            try {
                await Notification.create({
                    user_id: activity.creater_id,
                    act_id: activity.id,
                    object_id: variable.object_create,
                    message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
                });
            } catch (error) {
                console.error('Error creating notification:', error);
            }    
        }
    }));


    await Promise.all(activities.map(async (activity) => {
        const count = await Register_Act.count({
            where: {
                status_id: variable.status_act_accept,
                act_id: activity.id
            }
        });

        if (count < activity.amount) {
            // Update the status of the activity to 'rejected'
            await activity.update({ act_status: variable.status_act_reject });

            // Get the activity name
            const activityName = activity.act_name;

            try {
                await Notification.create({
                    user_id: activity.creater_id,
                    act_id: activity.id,
                    object_id: variable.object_create,
                    message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
                });
            } catch (error) {
                console.error('Error creating notification:', error);
            }    
        }
    }));
    



    console.log('Updated activities statuses.');
}

module.exports = updateActivityStatus;

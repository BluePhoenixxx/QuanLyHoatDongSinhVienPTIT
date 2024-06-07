
const Activity = require('../models').Activity;
const Register_Act = require('../models').Register_Act;
const User = require('../models').User;
const variable = require('../utils/variable.js');
const { sequelize } = require('../models');
const { Sequelize, Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const Notification = require('../models').Notification;
const Helper = require('../utils/helper');
const helper = new Helper();
const { where } = require('sequelize');


async function updateActivityStatus() {
    const today = new Date();
    const OneWeekAgo = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày để so sánh chính xác
    OneWeekAgo.setDate(today.getDate() - 7);
    // Cập nhật trạng thái expired cho các hoạt động đã qua ngày tổ chức
    Activity.update(  
        { act_status: variable.status_act_end },
        {
            where: {
                act_time: { [Sequelize.Op.lt]: today },
                act_status:  variable.status_act_ongoing
        }
        }
    )

    Activity.update(
        { act_status:variable.status_act_ongoing  },
        {
            where: {
                act_time: { [Sequelize.Op.eq]: today },
                act_status: variable.status_act_accept
            }
        }
    );

    Activity.update(
        { act_status:variable.status_act_reject  },
        {
            where: {
                act_time: { [Sequelize.Op.lte]: OneWeekAgo},
                act_status: variable.status_act_wait
            }
        }
    );  

    // Kiểm tra các hoạt động không đủ số lượng sinh viên đăng ký sau 3 ngày
    const threeDaysAgo = new Date();
    
    threeDaysAgo.setDate(today.getDate() - 3);
    

    const activities = await Activity.findAll({
        where: {
            act_time: { [Op.lte]: threeDaysAgo },
            act_status: variable.status_act_accept
        }
    });

    


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

            // try {
            //     await Notification.create({
            //         user_id: activity.creater_id,
            //         act_id: activity.id,
            //         object_id: variable.object_create,
            //         message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
            //     });
            // } catch (error) {
            //     console.error('Error creating notification:', error);
            // }    
            console.log(activity.id);
        }
    }));
    

    // for (const activity of activities) {
   
    //     const count = await Register_Act.count({
    //         where: {
    //             act_id: activity.id,
    //             status_id : variable.status_act_accept
    //         }
    //     });

    //     if (count < activity.amount) {
    //         // Cập nhật trạng thái của hoạt động thành 4
    //         await activity.update({ act_status: variable.status_act_reject });
    
    //         // Lấy tên hoạt động
    //         const activityName = activity.act_name;
    
    //         try {
    //             await Notification.create({
    //                 user_id: activity.creater_id,
    //                 act_id: activity.id,
    //                 object_id:variable.object_create,
    //                 message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
    //             });
    //         } catch (error) {
    //             console.error('Error creating notification:', error);
    //         }
    //     }
    // }


    console.log('Updated activities statuses.');
}

module.exports = updateActivityStatus;

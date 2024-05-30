const { Sequelize } = require('sequelize');
const Activity = require('../models').Activity;
const Register_Act = require('../models').Regier_Act;
async function updateActivityStatus() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày để so sánh chính xác

    // Cập nhật trạng thái expired cho các hoạt động đã qua ngày tổ chức
    await Activity.update(  
        { act_status: 'expired' },
        {
            where: {
                act_time: { [Sequelize.Op.lt]: today },
                act_status: 'active'
            }
        }
    );

    // Cập nhật trạng thái 5 cho các hoạt động đang diễn ra trong ngày hiện tại
    await Activity.update(
        { act_status: '5' },
        {
            where: {
                act_time: today,
                act_status: 'active'
            }
        }
    );

    // Kiểm tra các hoạt động không đủ số lượng sinh viên đăng ký sau 3 ngày
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    const activities = await Activity.findAll({
        where: {
            act_time: { [Op.lte]: threeDaysAgo },
            act_status: 2
        }
    });

    for (const activity of activities) {
        const count = await Register_Act.count({
            where: {
                act_id: activity.id,
                status_id : 2
            }
        });

        if (count < activity.amount) {
            // Cập nhật trạng thái của hoạt động thành 4
            await activity.update({ act_status: 4 });
    
            // Lấy tên hoạt động
            const activityName = activity.act_name;
    
            try {
                await Notification.create({
                    user_id: activity.creater_id,
                    act_id: activity.id,
                    object_id:1,
                    message: `Hoạt động "${activityName}" đã bị hủy vì không đạt được số lượng đăng ký đủ`
                });
            } catch (error) {
                console.error('Error creating notification:', error);
            }
        }
    }


    console.log('Updated activities statuses.');
}

module.exports = updateActivityStatus;

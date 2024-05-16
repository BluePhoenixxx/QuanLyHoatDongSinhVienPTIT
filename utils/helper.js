const RolePermission = require('../models').RolePermission;
const Permission = require('../models').Permission;
const Activity = require('../models').Activity;
class Helper {
    constructor() {}

    checkPermission(roleId, permName) {
        return new Promise(
            (resolve, reject) => {
                Permission.findOne({
                    where: {
                        perm_name: permName
                    }
                }).then((perm) => {
                    RolePermission.findOne({
                        where: {
                            role_id: roleId,
                            perm_id: perm.id
                        }
                    }).then((rolePermission) => {
                        // console.log(rolePermission);
                        if(rolePermission) {
                            resolve(rolePermission);
                        } else {
                            reject({message: 'Forbidden'});
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch(() => {
                    reject({message: 'Forbidden'});
                });
            }
        );
    }

    checkUserCreated(userId, activityId) {
        return new Promise((resolve, reject) => {
            Activity.findOne({
                where: {
                    id: activityId,
                    creater_id: userId
                }
            }).then((activity) => {
                if (activity) {
                    resolve(activity);
                } else {
                    reject({message: 'This activity does not belong to the user'});
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

}
async function checkPermission(roleId, permName) {
    try {
        const perm = await Permission.findOne({
            where: {
                perm_name: permName
            }
        });

        if (!perm) return false; // Nếu không tìm thấy quyền, trả về false

        const rolePermission = await RolePermission.findOne({
            where: {
                role_id: roleId,
                perm_id: perm.id
            }
        });

        return !!rolePermission; // Trả về giá trị boolean của rolePermission
    } catch (error) {
        console.error(error);
        return false; // Trả về false nếu có lỗi xảy ra
    }
}


// async function checkUserCreated(userId, activityId) {
//     try {
//         const activity = await Activity.findOne({
//             where: {
//                 id: activityId,
//                 creater_id: userId
//             }
//         });
//         return !!activity; // Chuyển đổi activity thành giá trị true hoặc false
//     } catch (error) {
//         console.error(error);
//         return false; // Trả về false nếu có lỗi
//     }
// }

// checkUserCreated(21, 2)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


module.exports = 
    Helper;
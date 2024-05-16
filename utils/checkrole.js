const RolePermission = require('../models').RolePermission;
const Permission = require('../models').Permission;
const Activity = require('../models').Activity;
const checkPermission2 = async (roleId, permName) => {
    try {
        const perm = await Permission.findOne({
            where: {
                perm_name: permName
            }
        });
        if (!perm) return false;

        const rolePermission = await RolePermission.findOne({
            where: {
                role_id: roleId,
                perm_id: perm.id
            }
        });
        return !(rolePermission == null); // Trả về giá trị boolean của rolePermission
    } catch (error) {
        console.error(error);
        return false;
    }
};



module.exports = checkPermission2;

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

        return rolePermission !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Example usage with top-level await in an ES module
// const roleId = 1;
// const permName = 'example_permission';

// const hasPermission =  checkPermission2(roleId, permName);
// console.log(hasPermission); // true or false


module.exports = checkPermission2;

const { Sequelize,DataTypes, where } = require('sequelize');
const Role = require('./models').Role;
const RolePermission = require('./models').RolePermission;
const User = require('./models').User;
const Permission = require('./models').Permission;
// Thông tin kết nối đến cơ sở dữ liệu MySQL
const dbConfig = {
  username: 'root',
  password: 'Bian1907@',
  database: 'testdb',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
};


// Khởi tạo đối tượng Sequelize với thông tin kết nối

// Kiểm tra kết nối đến cơ sở dữ liệu


// async function displayAllRoles() {
//   try {
//     const users = await User.findAll({
//       include: 
//       [
//         {
//           model: Role,
//           as: "UserRole",
//           attributes: ['role_name'],
//           include: [
//             {
//               model: Permission,
//               as: 'permissions',
//               attributes: ['perm_name'],
//               through: { attributes: [] } 
//             }
//           ]
//         }
//       ],
//       where : {id : 1},
//       attributes: ['username', 'role_id']
//     });
//     for (const user of users){
//       console.log("User:", user.username);
//       console.log("User:", user.role_id);
//       let r = await Role.findAll({
//         include: [
//           {
//             model: Permission,
//             as: 'permissions'
//           }
//         ],
//         where : {id : user.role_id},
//       });
//       console.log(r);
//     }
//   } catch (error) {
//     console.error('', error);
//   } finally {
//     // await sequelize.close(); // Đóng kết nối sau khi hoàn thành
//   }
// }

// const getALL = async () => {
//   let r = await User.findAll({

//     raw : true,
//     nest : true,
//   });
//   console.log(r);
  
// }

// Role.findAll({ 
//   where: { id: 1 }, 
//   include: [{ model: Permission, as: 'RolePermissions', attributes: ['id', 'perm_name']  }] 
// }).then(role => {
//   const permissions = role.RolePermissions.map(permission => ({
//     id: permission.id,
//     perm_name: permission.perm_name
//   }));
//   console.log(permissions);
// }).catch(err => {
//   console.error('Lỗi:', err);
// });
// getALL() ;
// displayAllRoles();
// const users =  Permission.findAll();
// console.log(users)
async function findUserAndUser() {
  try {
    const user = await User.findByPk(4);
    if (user === null) {
      console.log('User not found!');
    } else {
      // console.log(user instanceof User); // true
      // console.log('User primary key:', user.id); // Assuming 'id' is the primary key field
      console.log(user);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the async function
findUserAndUser();

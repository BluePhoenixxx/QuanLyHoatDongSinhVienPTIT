const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Role = require('../models').Role;
const Student = require('../models').Student;
var bcrypt = require('bcryptjs');
const University_Union = require('../models').University_Union;
const Notification = require('../models').Notification;
const passport = require('passport');
const Activity = require('../models').Activity
const variable = require('../utils/variable.js');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const student = require('../models/student');
const { sequelize } = require('../models');
const helper = new Helper();

const Sequelize = require('sequelize');
const { Where } = require('sequelize/lib/utils');
// Create a new User Student
router.post('/create_student', passport.authenticate('jwt', {
  session: false
}), async function (req, res) {
  const t = await sequelize.transaction(); 
  try {

    const rolePerm = await helper.checkPermission(req.user.role_id, 'user_add');

    if ( !req.body.password || !req.body.username || !req.body.MSSV || !req.body.first_name || !req.body.last_name || !req.body.phone ||  !req.body.class_id || !req.body.email || !req.body.gender_id || !req.body.birth_date) {
      return res.status(400).send({
        msg: 'Please pass  username, password, MSSV, first_name, last_name, phone, class_id, mail, gender_id, birth_date'
      });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      role_id: variable.role_student,
      status_id: variable.status_active
    }, { transaction: t });


    const userId = user.id;


    const student = await Student.create({
      MSSV: req.body.MSSV,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      address: req.body.address,
      position : req.body.position,
      class_id: req.body.class_id,
      email: req.body.email,
      gender_id: req.body.gender_id,
      birthday: req.body.birth_date,
      account_id: userId // Gán user.id cho account_id của sinh viên
    }, { transaction: t });
    // Commit transaction nếu không có lỗi xảy ra
    await t.commit();
    return res.status(201).send({ user, student });
  } catch (error) {
    await t.rollback();

    console.log(error);
    return res.status(400).send(error);
  }
});

// Get details user
router.get('/details', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get_details').then((rolePerm) => {

  }).catch((error) => {
      res.status(403).send(error);
  });
  
  if (variable.role_union == req.user.role_id){
    University_Union
    .findOne({
      where : {
        account_id : req.user.id
      }
    } )
    .then((university_union) => res.status(200).send(university_union))
    .catch((error) => {
        res.status(400).send(error);
    });
  } else {
    Student
        .findOne({
          where : {
            account_id : req.user.id
          }
        } )
        .then((student) => res.status(200).send(student))
        .catch((error) => {
            res.status(400).send(error);
        });
  }
  
});

// Create a new User union
router.post('/create_union', passport.authenticate('jwt', {
  session: false
}), async function (req, res) {
  const t = await sequelize.transaction(); // Bắt đầu một transaction

  try {
    // Kiểm tra quyền hạn của người dùng
    const rolePerm = await helper.checkPermission(req.user.role_id, 'user_add');

    if (!req.body.role_id || !req.body.password || !req.body.username) {
      return res.status(400).send({
        msg: 'Please pass Role ID, username, password'
      });
    }

    // Tạo người dùng
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      role_id: req.body.role_id,
      status_id: req.body.status_id
    }, { transaction: t });

    // Lấy user.id từ người dùng mới tạo
    const userId = user.id;

    // Tạo sinh viên với account_id được gán từ user.id
    const university_union = await University_Union.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      address: req.body.address,
      mail: req.body.mail,
      position: req.body.position,
      account_id: userId
    }, { transaction: t });

    // Commit transaction nếu không có lỗi xảy ra
    await t.commit();

    // Trả về kết quả thành công
    return res.status(201).send({ user, university_union });
  } catch (error) {
    // Rollback transaction nếu có lỗi xảy ra
    await t.rollback();

    console.log(error);
    return res.status(400).send(error);
  }
});

// Get all student
router.get('/student', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'get_all_student').then((rolePerm) => {
    Student
          .findAll()
          .then((perms) => res.status(200).send(perms))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
});

// Get all user
router.get('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get_all').then((rolePerm) => {
    User.findAll({
      where: {
        role_id: {
          [Sequelize.Op.ne]: variable.role_admin // Sequelize operator for "not equal"
        }
      }
    })
          .then((student) => res.status(200).send(student))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
});

// Get all user union
router.get('/university_union', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get_all').then((rolePerm) => {
    University_Union
          .findAll()
          .then((perms) => res.status(200).send(perms))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
});

// Get user by ID
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get').then((rolePerm) => {
    if (!req.params.id) {
      res.status(400).send({
        msg: 'Please pass user ID.'
      })};
  }).catch((error) => {
      res.status(403).send(error);
  });
  User
      .findByPk(req.params.id)
      .then((roles) => res.status(200).send(roles))
      .catch((error) => {
          res.status(400).send(error);
      });
});

// // Update a User
router.put('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'role_update').then((rolePerm) => {
    if (req.body.password) {
      userpass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12), null);
    }
      User
        .findByPk(req.params.id)
        .then((user) => {
          User.update({
            username: req.body.username || user.username,
            password: userpass || user.password,
            status_id: req.body.status_id || user.status_id,
            role_id: req.body.role_id || user.role_id
          }, {
            where: {
              id: req.params.id
            }
          }).then(_ => {
            res.status(200).send({
              'message': 'User updated'
            });
          }).catch(err => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  ).catch((error) => {
    res.status(403).send(error);
  });
});

// Update a User union
router.put('/university_union/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'update_details_union').then((rolePerm) => {

    University_Union
        .findByPk(req.params.id)
        .then((union) => {
          University_Union.update({
            first_name: req.body.first_name || union.first_name,
            last_name: req.body.last_name || union.last_name,
            phone : req.body.phone || union.phone,
            address: req.body.address || union.address,
            position: req.body.position || union.position,
            mail: req.body.mail || union.mail,

          }, {
            where: {
              id: req.params.id
            }
          }).then(_ => {
            res.status(200).send({
              'message': 'User updated'
            });
          }).catch(err => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  ).catch((error) => {
    res.status(403).send(error);
  });
});

// Update a student
router.put('/student/:MSSV', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'update_info_student').then((rolePerm) => {
    
    Student
        .findByPk(req.params.MSSV)
        .then((student) => {
          Student.update({
            first_name: req.body.first_name || student.first_name,
            last_name: req.body.last_name || student.last_name,
            phone : req.body.phone || student.phone,
            address: req.body.address || student.address,
            position: req.body.position || student.position,
            email: req.body.email || student.email,
            birthday: req.body.birthday || student.birthday,
            class_id: req.body.class_id || student.class_id

          }, {
            where: {
              MSSV: req.params.MSSV 
            }
          }).then(_ => {
            res.status(200).send({
              'message': 'User updated'
            });
          }).catch(err => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  ).catch((error) => {
    res.status(403).send(error);
  });
});

// Delete a User
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_delete').then((rolePerm) => {
    if (!req.params.id) {
      res.status(400).send({
        msg: 'Please pass user ID.'
      })
    } else {
      User
        .findByPk(req.params.id)
        .then((user) => {
          if (user) {
            // Delete user
            if (user.role_id == variable.role_union) {
              University_Union.destroy({
                where: {
                  account_id: req.params.id
                }
              });
            } else{
              Student.destroy({
                where: {
                  account_id: req.params.id
                }
              });
            }

            Notification.destroy({
              where:{
                user_id : req.params.id
              }
            })
            

            User.destroy({
              where: {
                id: req.params.id
              }
            }).then(_ => {
              res.status(200).send({
                'message': 'User deleted'
              });
            }).catch(err => res.status(400).send(err));
          } else {
            res.status(404).send({
              'message': 'User not found'
            });
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }).catch((error) => {
    res.status(403).send(error);
  });
});

module.exports = router;
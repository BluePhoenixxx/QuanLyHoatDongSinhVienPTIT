const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Role = require('../models').Role;
const Student = require('../models').Student;
const University_Union = require('../models').University_Union;
const passport = require('passport');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const student = require('../models/student');
const { sequelize } = require('../models');
const helper = new Helper();
let role_uinon = 4;
let role_admin = 1;
let role_student = 2;

// Create a new User Student
router.post('/create_student', passport.authenticate('jwt', {
  session: false
}), async function (req, res) {
  const t = await sequelize.transaction(); 
  try {
    // Kiểm tra quyền hạn của người dùng
    const rolePerm = await helper.checkPermission(req.user.role_id, 'user_add');

    if ( !req.body.password || !req.body.username || !req.body.MSSV || !req.body.first_name || !req.body.last_name || !req.body.phone ||  !req.body.class_id || !req.body.mail || !req.body.gender_id || !req.body.birth_date) {
      return res.status(400).send({
        msg: 'Please pass Role ID, username, password'
      });
    }
    // Tạo người dùng
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      role_id: 2,
      status_id: 1
    }, { transaction: t });

    // Lấy user.id từ người dùng mới tạo
    const userId = user.id;

    // Tạo sinh viên với account_id được gán từ user.id
    const student = await Student.create({
      MSSV: req.body.MSSV,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      address: req.body.address,
      position : req.body.position,
      class_id: req.body.class_id,
      mail: req.body.mail,
      gender_id: req.body.gender_id,
      birth_date: req.body.birth_date,
      account_id: userId // Gán user.id cho account_id của sinh viên
    }, { transaction: t });

    // Commit transaction nếu không có lỗi xảy ra
    await t.commit();

    // Trả về kết quả thành công
    return res.status(201).send({ user, student });
  } catch (error) {
    // Rollback transaction nếu có lỗi xảy ra
    await t.rollback();

    console.log(error);
    // Trả về lỗi nếu có lỗi xảy ra
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
  
  if (role_uinon == req.user.role_id){
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


// Get all user
router.get('/student', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get_all').then((rolePerm) => {
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

// Get all student
router.get('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get_all').then((rolePerm) => {
    Student
          .findAll()
          .then((student) => res.status(200).send(student))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
});



// Get all user
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


// Update a User
router.put('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'role_update').then((rolePerm) => {
    if (!req.body.role_id || !req.body.email || !req.body.password || !req.body.fullname || !req.body.phone) {
      res.status(400).send({
        msg: 'Please pass Role ID, email, password, phone or fullname.'
      })
    } else {
      User
        .findByPk(req.params.id)
        .then((user) => {
          User.update({
            username: req.body.username || user.username,
            password: req.body.password || user.password,
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
  }).catch((error) => {
    res.status(403).send(error);
  });
});

// Delete a User
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'role_delete').then((rolePerm) => {
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
            if (user.role_id == role_uinon) {
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
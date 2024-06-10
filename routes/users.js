const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const passport = require('passport');
const { User, Student, University_Union, Notification, Activity } = require('../models')
const variable = require('../utils/variable.js');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const { sequelize } = require('../models');
const helper = new Helper();
const {dateRegex,passwordRegex, phoneRegex, gmailRegex } = require('../config/validateId.js');
const validatePhoneNumber = (phoneNumber) => phoneRegex.test(phoneNumber);
const validateGmailAddress = (email) => gmailRegex.test(email);
const validatePassword = (password) => passwordRegex.test(password);
const validateData = (date) => dateRegex.test(date);
const isValidDateInRange = dateString => new Date(dateString) <= new Date(new Date().setFullYear(new Date().getFullYear() - 16));
const Sequelize = require('sequelize');
const { Where } = require('sequelize/lib/utils');
require('dotenv').config()
const env_mail = process.env.ADMIN_EMAIL || 'nguyentranhungbien@gmail.com';
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
      include : {
        model: User,
        as: 'account'
      },
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

// Create a new User Student
router.post('/create_student', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const { role_id, password, MSSV,username, phone, email, first_name, last_name, address, position ,status_id, class_id, gender_id, birth_date} = req.body;

  if (!role_id || !password || !username || !validatePhoneNumber(phone) || !validateGmailAddress(email) || !validatePassword(password) || !validateData(birth_date) || !isValidDateInRange(birth_date)) {
    return res.status(400).send({ msg: 'Please pass valid  username, password, phone number, and email' });
  }

  const existingUniontMail = await University_Union.findOne({ where: { email: email } } );
  const existingUniontPhone = await University_Union.findOne({ where: { phone: phone } } );
  const existingStudentMail = await Student.findOne({ where: { email: email } } );
  const existingStudentPhone = await Student.findOne({ where: { phone: phone } } );
    if (existingStudentMail || existingUniontMail || email == env_mail) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    if (existingStudentPhone || existingUniontPhone) {
      return res.status(400).send({ msg: 'Phone already exists' });
    }
  try {
    
    
    const rolePerm = await helper.checkPermission(req.user.role_id, 'user_add_student');
    // Đồng bộ hóa cơ sở dữ liệu
    await sequelize.sync();

    // Tạo người dùng và sinh viên trong cùng một thời điểm
    const user = await User.create({ username, password, role_id, status_id});
    const student = await Student.create({ MSSV,first_name, last_name, phone, address, gender_id, email, position,class_id, birthday : birth_date,account_id: user.id });

    // Trả về kết quả thành công
    return res.status(201).send({ user, student });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
});


router.post('/create_union', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const { role_id, password, username, phone, email, first_name, last_name, address, position } = req.body;

  if (!role_id || !password || !username || !validatePhoneNumber(phone) || !validateGmailAddress(email) || !validatePassword(password)) {
    return res.status(400).send({ msg: 'Please pass valid  username, password, phone number, and email' });
  }
  const existingUniontMail = await University_Union.findOne({ where: { email: email } } );
  const existingUniontPhone = await University_Union.findOne({ where: { phone: phone } } );
  const existingStudentMail = await Student.findOne({ where: { email: email } } );
  const existingStudentPhone = await Student.findOne({ where: { phone: phone } } );
    if (existingStudentMail || existingUniontMail || email == env_mail) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    if (existingStudentPhone || existingUniontPhone) {
      return res.status(400).send({ msg: 'Phone already exists' });
    }
  try {
   

    const rolePerm = await helper.checkPermission(req.user.role_id, 'user_add');
    // Đồng bộ hóa cơ sở dữ liệu
    await sequelize.sync();

    // Tạo người dùng và sinh viên trong cùng một thời điểm
    const user = await User.create({ username, password, role_id, status_id: req.body.status_id });
    const university_union = await University_Union.create({ first_name, last_name, phone, address, email, position, account_id: user.id });

    // Trả về kết quả thành công
    return res.status(201).send({ user, university_union });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
});




// Get all student
router.get('/student', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'get_all_student').then((rolePerm) => {
    Student.findAll({
            include:{
              model: User,
              as: 'account'
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
          .findAll({
            include : {
              model: User,
              as: 'account'
            }
          })
          .then((users) => res.status(200).send(users))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
});

// Get user student by ID
router.get('/student-id/:id', passport.authenticate('jwt', {
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
  Student
      .findOne({
        include : {
          model: User,
          as: 'account'
        },
        where: {
          account_id: req.params.id
        }
      })
      .then((roles) => res.status(200).send(roles))
      .catch((error) => {
          res.status(400).send(error);
      });
});

// Get user union by ID
router.get('/university_union-id/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'user_get').then((rolePerm) => {
    if (!req.params.id) {
      res.status(400).send({
        msg: 'Please pass user ID.'
      })};
  }).catch((error) => {
      res.status(403).send(error);s
  });
  University_Union
      .findOne({
        include : {
          model: User,
          as: 'account'
        }
      }, {
        where: {
          account_id: req.params.id
        }
      })
      .then((roles) => res.status(200).send(roles))
      .catch((error) => {
          res.status(400).send(error);
      });
});

// // Update a User
router.put('/update/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'role_update').then((rolePerm) => {
    // if (req.body.password) {
    //   userpass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
    // }
      User
        .findByPk(req.body.id)
        .then((User) => { 
          console.log(User)
          User.update({
            username: req.body.username || User.username,
            password: req.body.password || User.password,
            status_id: req.body.status_id || User.status_id,
            role_id: req.body.role_id|| User.role_id
          }).then(_ => {
            res.status(200).send({
              'message': 'User updated'
            });
          }).catch(err => res.status(401).send(err));
        })
        .catch((error) => {
          res.status(400).send("Không tìm thấy ");
        });
    }
  ).catch((error) => {
    res.status(403).send(error);
  });
});

//  Update of user by id act
// router.put('/update-act/', passport.authenticate('jwt', {
//   session: false
// }), function (req, res) {
//   helper.checkPermission(req.user.role_id, 'act_update').then((rolePerm) => {

//           Activity
//               .findByPk(req.body.id)
//               .then((Activity) => {
//                   Activity.update({
//                       act_name: req.body.act_name || Activity.act_name,
//                       act_description: req.body.act_name || Activity.act_name,
//                       act_address: req.body.act_address || Activity.act_address,
//                       act_price: req.body.act_price || Activity.act_price,
//                       act_time: req.body.act_time || Activity.act_time,
//                       amount: req.body.amount || Activity.amount,
//                       organization: req.body.organization || Activity.organization

//                   }, {
//                       where: {
//                           id: req.body.id,
//                           creater_id :req.user.id
//                       }
//                   }).then(_ => {
//                       res.status(200).send({
//                           'message': 'Activity updated'
//                       });
//                   }).catch(err => res.status(400).send(err));
//               })
//               .catch((error) => {
//                   res.status(400).send(error);
//               });
//       }
//   ).catch((error) => {
//       res.status(403).send(error);
//   });
// });

// Update a User union
router.put('/university_union/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'update_details_union').then((rolePerm) => {
    


    if (req.body.email == env_mail) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    if (existingStudentPhone || existingUniontPhone) {
      return res.status(400).send({ msg: 'Phone already exists' });
    }

    if (req.body.phone) {
      if (!validatePhoneNumber(req.body.phone)) {
        return res.status(400).send({
          msg: 'Please pass validate phone number'
        });
      }
    }
   
    if (req.body.email) {
      if (!validateGmailAddress(req.body.email) ) {
        return res.status(400).send({
          msg: 'Please pass validate email'
        });
      }
    }
    University_Union
        .findByPk(req.body.id_union)
        .then((union) => {
          University_Union.update({
            first_name: req.body.first_name || union.first_name,
            last_name: req.body.last_name || union.last_name,
            phone : req.body.phone || union.phone,
            address: req.body.address || union.address,
            position: req.body.position || union.position,
            email: req.body.email || union.email,

          }, {
            where: {
              id: req.body.id_union
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
router.put('/student/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'update_info_student').then((rolePerm) => {
    check = req.body.MSSV

  
      if (req.body.email == env_mail) {
        return res.status(400).send({ msg: 'Email already exists' });
      }

    if (req.body.phone) {
      if (!validatePhoneNumber(req.body.phone)) {
        return res.status(400).send({
          msg: 'Please pass validate phone number'
        });
      }
    }

    if (req.body.email) {
      if (!validateGmailAddress(req.body.email)) {
        return res.status(400).send({
          msg: 'Please pass validate email'
        });
      }
    }

    if (req.body.birthday) {
      if (!validateData(req.body.birthday) || !isValidDateInRange(req.body.birthday)) {
        return res.status(400).send({
          msg: 'Please pass validate birth date'
        });
      }
    }


    Student
        .findByPk(req.body.MSSV)
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
              MSSV: req.body.MSSV
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

// Get all notification of user
router.get('/notifications', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'get_all_notification').then((rolePerm) => {
    Notification
          .findAll({
            where: {
              user_id: req.user.id
            }
          })
          .then((perms) => res.status(200).send(perms))
          .catch((error) => {
              res.status(400).send(error);
          });
  }).catch((error) => {
      res.status(403).send(error);
  });
}); 

router.post('/change-password', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  helper.checkPermission(req.user.role_id, 'change_password').then(async (rolePerm) => {

    if (!validatePassword(req.body.newpassword) || !validatePassword(req.body.passwordcheck) || !validatePassword(req.body.oldpassword)) {
      return res.status(400).send({
        msg: 'Please pass validate password and old password'
      });
    }
   if (req.body.newpassword !== req.body.passwordcheck || req.body.passwordcheck == req.body.oldpassword) {
      return res.status(400).send({
        msg: 'Please pass not same password'
      });
    }
 
  try {
    bcrypt.compare(req.body.oldpassword, req.user.password, function (err, isMatch) {
      
      if (!isMatch || err) {
          res.status(401).send({
          success: false,
          message: 'Authentication failed. oldpassword is incorrect'
      });
      }
  });
  } catch (error) {
    return res.status(400).send(error);
  } 

   
    
    const userfind = await User.findOne({
      where: {
        id: req.user.id,
      }
    });

    userfind.password = req.body.newpassword   ;
    await userfind.save();

    res.send({
      'message': 'Password changed'
    });
  }).catch((error) => {
      res.status(403).send(error);
  });
});


module.exports = router;
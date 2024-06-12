const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
require('../config/passport')(passport);
const { User, Student, University_Union} = require('../models')
const variable = require('../utils/variable.js');
const nodemailer = require('nodemailer');
const { where } = require('sequelize');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { log } = require('console');

const env_mail = process.env.ADMIN_EMAIL || 'nguyentranhungbien@gmail.com';

// router.post('/signup', function (req, res) {
//     if (!req.body.email || !req.body.password || !req.body.fullname) {
//         res.status(400).send({
//             msg: 'Please pass username, password and name.'
//         })
//     } else {
//         Role.findOne({
//             where: {
//                 role_name: 'admin'
//             }
//         }).then((role) => {
//             console.log(role.id);
//             User
//             .create({
//                 email: req.body.email,
//                 password: req.body.password,
//                 fullname: req.body.fullname,
//                 phone: req.body.phone,
//                 role_id: role.id
//             })
//             .then((user) => res.status(201).send(user))
//             .catch((error) => {
//                 res.status(400).send(error);
//             });
//         }).catch((error) => {
//             res.status(400).send(error);
//         });
//     }
// });

router.get('/key', (req, res) => {
  res.send("#bienwindows\n ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCWgR0UZEwJnGub+WLwnOBLcgfPi/rkaU5VnR0aoE6wjIlx5/QHC3AC2s/nDFmBb5X6mPjPiPASIXVGi+FVF0WnRdOGuvMRx3cp0QXe/V7VBVyDWIerW1q/9rTzFSkw1Xv/LTwmjDly1eEwaZUixyKblOP9mIaWPJGDy+lubvSmaBYy5EUeloYBYRBKzT6tRXUGuG6daYPxoE0y9a9AAkGusAJJyG0G3Sg4Q6LisxLjh/JKnN0QRQXEhcstTwu+45xDua8GYnIMJDrhEMhYD49kZEY/kRWad0BJQoufZgwzfxjkdJNk6sLP/7Fs2hzk7j9Cq45jOxzJ4T65cqi0/UhA3k3TiW/wvsrJ9NtSQY7Gv1mfd+C5CEWeYd92r7kh3V++4rOTdKDyBPF0ivef04zfrrUFz9DzJz9fdrx87OgO4LnnxsunMnePd1VwrfsQnf9N5Tj8HCueJSW+O0Jk6ZQKvOFBsdJLaQc6XhfbSTdVdgxnSVyEfzlKKMfDvuvlcL8= admin@BluePhoenixM")
});


// Check login
router.post('/login', async function (req, res) {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. Username or password is incorrect.',
            });
        }

        if (user.status_id != 1) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. User is not active.',
            });
        }
        // Check password with bcrypt
        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

            if (isMatch && !err) {
                // create payload don't include password
                const userWithoutPassword = { ...user.dataValues };
                delete userWithoutPassword.password;

                var token = jwt.sign(JSON.parse(JSON.stringify(userWithoutPassword)), variable.secret_key, {
                    expiresIn: 60 *  60 * 240 // 240 hours             
                    });
                
                jwt.verify(token, variable.secret_key, function (err, data) {
                    console.log(err, data);
                })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    role : user.role_id
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: 'Authentication failed. Username or password is incorrect'
                });
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Quên mật khẩu 
router.post('/forgot-password', async (req, res) => {
    const user_student = await User.findOne({
       include: [
         {
           model: Student,
           as : 'account',
           where: {
             email :req.body.email,
           }
         }  
       ]
    });

    const user_union = await User.findOne({
      include: [
        {
          model: University_Union,
          as : 'union',
          where: {
            email :req.body.email,
          }
        }  
      ]
   });

    if (!user_student && !user_union && (req.body.email != env_mail)) {
      return res.status(400).send('User with given email does not exist');
    }
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // OTP 6 ký tự
    const expires = Date.now() + 120000;

    if (req .body.email == env_mail) {
      const user_admin = await User.findOne({
        where: {
          role_id: variable.role_admin
        }
      })
      user_admin.otp = otp;
      user_admin.otpExpires = expires;
      await user_admin.save()
    }

    if (user_student) {
     user_student.otp = otp;
     user_student.otpExpires = expires;
      await user_student.save()
    }
      
  
    if (user_union) {
      user_union.otp = otp;
      user_union.otpExpires = expires;
      await user_union.save()
    }
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'bienproyt123@gmail.com',
        pass: 'ymddhgpjbakntizp',
      },
    });``
  
    const mailOptions = {
      to: req.body.email,
      from: 'bienproyt123@gmail.com',
      subject: 'Password Reset OTP QuanLyHoatDongPTIT',
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 1 minute.`,
    };
  
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error: ', err);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('OTP sent to your email');
    });
  });
  
// Đặt lại mật khẩu bằng OTP
router.post('/reset-password', async (req, res) => {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      inlucde : [
        {
          model : Student,
          as : 'account',
          where : {
            email : email
          }
        },
        {
          model : University_Union,
          as : 'account',
          where : {
            email : email
          }
        }
      ],
      where: {
          otp: otp,
          otpExpires: {
              [Op.gt]: new Date(),
          }
      }
  });
    

    if (!user) {
      return res.status(400).send('Invalid OTP or OTP has expired');
    }

    user.password = password;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
  
    res.status(200).send('Password has been reset');
  });
  
module.exports = router;
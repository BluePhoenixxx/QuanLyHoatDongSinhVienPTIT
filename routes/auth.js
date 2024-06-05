const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
require('../config/passport')(passport);
const User = require('../models').User;
const Student = require('../models').Student;
const Role = require('../models').Role;
const variable = require('../utils/variable.js');
const nodemailer = require('nodemailer');
const { where } = require('sequelize');
const crypto = require('crypto');
const { configDotenv } = require('dotenv');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
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
                    expiresIn: 60 * 1200
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

router.post('/forgot-password', async (req, res) => {
    const user = await User.findOne({
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
  
    if (!user) {
      return res.status(400).send('User with given email does not exist');
    }

    const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // OTP 6 ký tự
    const expires = Date.now() + 120000;
  
    user.otp = otp;
    user.otpExpires = expires;
    await user.save();
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'bienproyt123@gmail.com',
        pass: 'ymddhgpjbakntizp',
      },
    });
  
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
  
// Endpoint đặt lại mật khẩu bằng OTP
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
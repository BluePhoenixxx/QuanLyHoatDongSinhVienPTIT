const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../config/passport')(passport);
const User = require('../models').User;
const Role = require('../models').Role;
    
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
        
        // Kiểm tra mật khẩu bằng bcrypt
        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (isMatch && !err) {
                var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {
                    expiresIn: 60 * 30
                });
                jwt.verify(token, 'nodeauthsecret', function (err, data) {
                    console.log(err, data);
                })
                res.json({
                    success: true,
                    token: 'JWT ' + token
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



  
module.exports = router;
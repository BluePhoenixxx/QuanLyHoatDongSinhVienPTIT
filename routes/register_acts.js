const express = require('express');
const router = express.Router();
const Activity = require('../models').Activity;
const Register_Act = require('../models').Register_Act;
const Notification = require('../models').Notification;

const passport = require('passport');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const { where } = require('sequelize');
const variable = require('../utils/variable');
const helper = new Helper();
let object_register = 2;
let status_act_accept = 2;
let status_act_reject = 4;
// Create a new Activities

// Create register activites
router.post('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'register_acts').then((rolePerm) => {
            Register_Act
                .create({
                    act_id :req.body.act_id ,
                    act_account: req.user.id,
                    status_id: 1,
                })
                .then((Activity) => res.status(201).send(Activity))
                .catch((error) => {
                    console.log(error);
                    res.status(400).send(error);    
                });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get register activities
router.get('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_accept_register').then((rolePerm) => {
        Register_Act.findAll()
            .then((Register_Act) => res.status(200).send(Register_Act))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get register activities by id activity
router.get('/get_accept_register/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_accept_register').then((rolePerm) => {
        Register_Act.findAll({
            where: {
                act_id: req.body.id
            }
        })
            .then((Register_Act) => res.status(200).send(Register_Act))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});
    

// Accecpt all register activities
router.put('/accept_all/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'accept_all_register').then((rolePerm) => {
        Register_Act
            .update({status_id: variable.status_act_accept}, {
                where: {
                    status_id: variable.status_act_wait,
                    act_id: req.body.id
                }
            })
            .then((Register_Act) => res.status(200).send("Register Accepted"))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {   
        res.status(403).send(error);
    });
}); 
           


// Get register activities by id 
router.get('/regiset-id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get-register-by-id').then((rolePerm) => {
        Register_Act
            .findByPk(req.body.id)
            .then((Register_Act) => res.status(200).send(Register_Act))
            .catch((error) => {
                res.status(400).send(error);
            }); 
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Update a Register by id
router.put('/', passport.authenticate('jwt', {
    session: false
}), async function (req, res) {
    const status_act = req.body.status ? parseInt(req.body.status, 10) : null;

    try {
        await helper.checkPermission(req.user.role_id, 'act_update');

        const register = await Register_Act.findByPk(req.body.id);
        if (!register) {
            return res.status(404).send({ message: 'Register Activity not found' });
        }

        await register.update({ status_id: status_act,
        });
        
        const activity = await Activity.findByPk(register.act_id);


        if (status_act === status_act_accept) {
            mess = `Hoạt động bạn đăng ký  `  + activity.act_name + ` đã được duyệt tham gia`;
        } else if (status_act === status_act_reject) {
            mess = `Hoạt động bạn đăng ký `  + activity.act_name + ` đã không được duyệt tham gia`;}

                await Notification.create({
                    act_id: activity.id,
                    user_id: register.creater_id,
                    object_id: object_register, // Assuming object_id is the activity id
                    user_id: req.user.id,
                    message: mess
                });

        res.status(200).send({ message: 'Register Activity updated and notification created' });
    } catch (err) {
        if (err.message === 'Permission denied') {
            res.status(403).send({ message: 'Permission denied', error: err });
        } else if (err.message === 'Activity not found') {
            res.status(404).send({ message: 'Activity not found', error: err });
        } else {
            res.status(400).send({ message: 'An error occurred', error: err });
        }
    }
});
 
// Delete register
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'register_act_delete').then((rolePerm) => {
        if (!req.params.id) {
            res.status(400).send({
                msg: 'Please pass Activity ID.'
            })
        } else {
            Register_Act
                .findByPk(req.params.id)
                .then((Activity) => {
                    if (Activity) {
                        Activity.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(_ => {
                            res.status(200).send({
                                'message': 'Register deleted'
                            });
                        }).catch(err => res.status(400).send(err));
                    } else {
                        res.status(404).send({
                            'message': 'Register not found'
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
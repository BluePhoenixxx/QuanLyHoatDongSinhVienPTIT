const express = require('express');
const router = express.Router();
const Activity = require('../models').Activity;
const Register_Act = require('../models').Register_Act;
const User = require('../models').User;
const Notification = require('../models').Notification;
const Sequelize = require('sequelize');
const passport = require('passport');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();
const checkPermission2 = require('../utils/checkrole.js');
const { where } = require('sequelize');
const variable = require('../utils/variable.js');

// Create a new Activities
router.post('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_add').then((rolePerm) => {
        if (!req.body.act_name || !req.body.act_address || !req.body.act_time || !req.body.amount ) {
            res.status(400).send({
                msg: 'Please pass Activitity name, status , address or creater.'
            })
        } else {
            let status_id = 1;
            admin = false;
            if (req.user.role_id == variable.role_admin) {  
                status_id = variable.status_act_accept;
                admin = true;
                auth = req.user.id;
                organization = "Học viện";
            }   
            
            Activity
                .create({
                    act_name: req.body.act_name,
                    act_description: req.body.act_description,
                    act_address: req.body.act_address,
                    act_price: req.body.act_price,
                    act_time : req.body.act_time,
                    audit_id : admin ? auth : null,
                    act_status: status_id,
                    creater_id : req.user.id,
                    amount :req.body.amount,
                    organization : admin ? organization : req.body.organization
                })
                .then((Activity) => res.status(201).send(Activity))
                .catch((error) => {
                    console.log(error);
                    res.status(400).send(error);
                });
        }
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get List of Activities accept
router.get('/activities_accept', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_get_all_acp').then((rolePerm) => {
        Activity
            .findAll({
                where: {
                    act_status: variable.status_act_accept,
                }
            })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});


// router.get('/activities_admin_created', passport.authenticate('jwt', {
//     session: false
// }), function (req, res) {
//     helper.checkPermission(req.user.role_id, 'get_all_act__created').then((rolePerm) => {
//         Activity.findAll({
//             include: {
//               model: User,
//               as : 'creater',
//               where: {
//                 role_id: variable.role_admin
//               }
//             },
//             where : {
//               act_status: 1
//             }
//         })
//             .then((Activitys) => res.status(200).send(Activitys))
//             .catch((error) => {
//                 res.status(400).send(error);
//             });
//     }).catch((error) => {
//         res.status(403).send(error);
//     });
// });


//Statistical Activities accept    
router.get('/statistical', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    const year = req.body.year ? parseInt(req.body.year, 10) : null;
    const month = req.body.month ? parseInt(req.body.month, 10) - 1 : null; // JavaScript months are 0-11
    const limit = req.body.limit ? parseInt(req.body.limit, 10) : null;

    // Validate the parameters
    if ((year && isNaN(year)) || (month && (isNaN(month) || month < 0 || month > 11)) || (limit && (isNaN(limit) || limit <= 0))) {
        return res.status(400).send({ message: 'Invalid parameters' });
    }

    // Calculate the start and end dates for the given month and year, if provided
    let dateFilter = {};
    if (year !== null && month !== null) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59); // Last second of the month
        dateFilter = {
            act_time: {
                [Sequelize.Op.between]: [startDate, endDate]
            }
        };
    } else if (year !== null) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59); // Entire year
        dateFilter = {
            act_time: {
                [Sequelize.Op.between]: [startDate, endDate]
            }
        };
    }

    helper.checkPermission(req.user.role_id, 'act_get_all_acp').then((rolePerm) => {
        Activity
            .findAll({
                where: year !== null ? dateFilter : {},
                order: [['act_time', 'DESC']],
                limit: limit
            })
            .then((activities) => {
                if (activities.length > 0) {
                    res.status(200).send(activities);
                } else {
                    res.status(404).send({ message: 'No activities found' });
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            }); 
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get all Activities created by activity union
router.get('/activities_union_created', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_all_act_union_created').then((rolePerm) => {
        Activity.findAll({
            include: {
              model: User,
              as : 'creater',
              where: {
                role_id: variable.role_union
              }
            },
            where : {
              act_status: 1
            }
        })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get all Activities created by activity student
router.get('/activities_student_created', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_all_act_student_created').then((rolePerm) => {
        Activity.findAll({
            include: {
              model: User,
              as : 'creater',
              where: {
                role_id: variable.role_class
              }
            },
            where: {
              act_status: 1
            }
        })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});


router.get('/activities_student_created_accept', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_all_act_student_created').then((rolePerm) => {
        Activity.findAll({
            include: {
              model: User,
              as : 'creater',
              where: {
                role_id: variable.role_class
              }
            },
            where: {
              act_status: variable.status_act_accept
            }
        })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get List of Activities unaccept
router.get('/activities_unaccept', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_get_all_unacp').then((rolePerm) => {
        Activity
            .findAll({
                where: {
                    act_status: variable.status_act_wait,
                }
            })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get list of activities created by user
router.get('/activities_user_created', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_get_all_created').then((rolePerm) => {
        Activity
            .findAll({
                where: {
                    creater_id: req.user.id,
                }
            })
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Update a Activity by ID by university union created
router.put('/activities_union_created/', passport.authenticate('jwt', {
    session: false
}), async function (req, res) {
    const status_act = req.body.status ? parseInt(req.body.status, 10) : null;

    try {
        await helper.checkPermission(req.user.role_id, 'act_union_accecpt_update');

        const activity = await Activity.findByPk(req.body.id);
        if (!activity) {
            return res.status(404).send({ message: 'Activity not found' });
        }

        await activity.update({ act_status: status_act,
            audit_id: req.user.id 
        });
        if (status_act === variable.status_act_accept ) {
            mess = `Hoạt động của bạn `  + activity.act_name + ` đã được duyệt tổ chức`;
        } else if (status_act === variable.status_act_reject) {
            mess = `Hoạt động của bạn `  + activity.act_name + ` đã không được duyệt tổ chức`;}

                await Notification.create({
                    act_id: activity.id,
                    user_id: activity.creater_id,
                    object_id: variable.object_create,
                    message: mess
                });

        res.status(200).send({ message: 'Activity updated and notification created' });
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


// Update a Activity by ID by student class  created
router.put('/activities_student_created/', passport.authenticate('jwt', {
    session: false
}), async function (req, res) {
    const status_act = req.body.status ? parseInt(req.body.status, 10) : null;

    try {
        await helper.checkPermission(req.user.role_id, 'act_student_accecpt_update');

        const activity = await Activity.findByPk(req.body.id);
        if (!activity) {
            return res.status(404).send({ message: 'Activity not found' });
        }

        await activity.update({ act_status: status_act,
            audit_id: req.user.id 
        });
        if (status_act === variable.status_act_accept ) {
            mess = `Hoạt động của bạn `  + activity.act_name + ` đã được duyệt tổ chức`;
        } else if (status_act === variable.status_act_reject ) {
            mess = `Hoạt động của bạn `  + activity.act_name + ` đã không được duyệt tổ chức`;}

                await Notification.create({
                    act_id: activity.id,
                    user_id: activity.creater_id,
                    object_id: variable.object_create,
                    message: mess
                });

        res.status(200).send({ message: 'Activity updated and notification created' });
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

// Get List of Activities created student join login
router.get('/activities_student_joined', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_list_act_stu_join').then((rolePerm) => {
        Activity.findAll({
            include : {
                model : Register_Act,
                as : "register",
                where : {
                    act_account : req.user.id,
                    status_id : variable.status_act_accept
                }
            }
        })
            .then((Activity) => res.status(200).send(Activity))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

router.get('/activities_student_unjoined', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_list_act_stu_join').then((rolePerm) => {
        Activity.findAll({
            include : {
                model : Register_Act,
                as : "register",
                where : {
                    act_account : req.user.id,
                    status_id : variable.status_act_wait
                }
            }
        })
            .then((Activity) => res.status(200).send(Activity))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});


// Get List of Activities created student join
router.get('/activities_student_joined-id/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_list_act_stu_join_s').then((rolePerm) => {
        Activity.findAll({
            include : {
                model : Register_Act,
                as : "register",
                where : {
                    act_account : req.body.id
                }
            }
        })
            .then((Activity) => res.status(200).send(Activity))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get List of Activities
router.get('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_get_all').then((rolePerm) => {
        Activity
            .findAll()
            .then((Activitys) => res.status(200).send(Activitys))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Get Activities by ID 
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_get').then((rolePerm) => {
        Activity
            .findByPk(req.params.id)
            .then((Activity) => res.status(200).send(Activity))
            .catch((error) => {
                res.status(400).send(error);
            });
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Update a Activitity
router.put('/update-act/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_update').then((rolePerm) => {

            Activity
                .findByPk(req.body.id)
                .then((Activity) => {
                    Activity.update({
                        act_name: req.body.act_name || Activity.act_name,
                        act_description: req.body.act_name || Activity.act_name,
                        act_address: req.body.act_address || Activity.act_address,
                        act_price: req.body.act_price || Activity.act_price,
                        act_time: req.body.act_time || Activity.act_time,
                        amount: req.body.amount || Activity.amount,
                        organization: req.body.organization || Activity.organization

                    }, {
                        where: {
                            id: req.body.id,
                            creater_id :req.user.id
                        }
                    }).then(_ => {
                        res.status(200).send({
                            'message': 'Activity updated'
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

// Delete a Activitity
router.delete('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_delete').then((rolePerm) => {
        if (!req.body.id) {
            res.status(400).send({
                msg: 'Please pass Activity ID.'
            })

        // const act = Activity.findByPk(req.body.id);
        } else {
            Activity
                .findByPk(req.body.id)
                .then((Activity) => {
                    if ((req.user.role_id == variable.role_admin || Activity.creater_id == req.user.id) && Activity) {

                        Register_Act.destroy({
                            where: {
                                act_id: req.body.id
                            }
                        });

                        Activity.destroy({
                            where: {
                                id: req.body.id
                            }
                        }).then(_ => {
                            res.status(200).send({
                                'message': 'Activity deleted'
                            });
                        }).catch(err => res.status(400).send("Không được xóa hoạt động không phải của bạn"));
                    } else {
                        res.status(404).send({
                            'message': 'Không được xóa hoạt động không phải của bạn'
                        });
                    }
                })
                .catch((error) => {
                    res.status(400).send("Activity not found");
                });
        }
    }).catch((error) => {
        res.status(403).send(error);
    });
});

module.exports = router;
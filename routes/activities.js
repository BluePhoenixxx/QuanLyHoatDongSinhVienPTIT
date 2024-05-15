const express = require('express');
const router = express.Router();
const Activity = require('../models').Activity;
const passport = require('passport');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();

// Create a new Activities
router.post('/', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_add').then((rolePerm) => {
        if (!req.body.act_name || !req.body.act_address) {
            res.status(400).send({
                msg: 'Please pass Activitity name, status , address or creater.'
            })
        } else {
            Activity
                .create({
                    act_name: req.body.act_name,
                    act_description: req.body.act_description,
                    act_address: req.body.act_address,
                    act_price: req.body.act_price,
                    act_status: req.body.act_status,
                    creater_id : req.body.creater_id,
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
                    act_status: 2,
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

// get list of activities created by user
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
router.put('/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_update').then((rolePerm) => {
        if (!req.body.prod_name || !req.body.prod_description || !req.body.prod_image || !req.body.prod_price) {
            res.status(400).send({
                msg: 'Please pass Activity name, description, image or price.'
            })
        } else {
            Activity
                .findByPk(req.params.id)
                .then((Activity) => {
                    Activity.update({
                        prod_name: req.body.prod_name || user.prod_name,
                        prod_description: req.body.prod_description || user.prod_description,
                        prod_image: req.body.prod_image || user.prod_image,
                        prod_price: req.body.prod_price || user.prod_price
                    }, {
                        where: {
                            id: req.params.id
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
    }).catch((error) => {
        res.status(403).send(error);
    });
});

// Delete a Activitity
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'act_delete').then((rolePerm) => {
        if (!req.params.id) {
            res.status(400).send({
                msg: 'Please pass Activity ID.'
            })
        } else {
            Activity
                .findByPk(req.params.id)
                .then((Activity) => {
                    if (Activity) {
                        Activity.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(_ => {
                            res.status(200).send({
                                'message': 'Activity deleted'
                            });
                        }).catch(err => res.status(400).send(err));
                    } else {
                        res.status(404).send({
                            'message': 'Activity not found'
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
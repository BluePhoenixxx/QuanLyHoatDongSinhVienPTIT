const express = require('express');
const router = express.Router();
const Activity = require('../models').Activity;
const Register_Act = require('../models').Register_Act;
const passport = require('passport');
require('../config/passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();




// Create a new Activities
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



// Get Activities by ID 
router.get('/get_accept_register', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    helper.checkPermission(req.user.role_id, 'get_accept_register').then((rolePerm) => {
        Register_Act.findAll({
            include: [{
                model: Activity,
                where: sequelize.literal(`Activity.creater_id = ${req.user.id}`)
            }]
        })
            .then((Register_Act) => res.status(200).send(Register_Act))
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
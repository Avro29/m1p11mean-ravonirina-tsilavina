const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Appointment = require("./appointment.model");
const UserRole = require('../../constants/UserRole');
const User = require('../users/user.model');
const Service = require('../services/service.model');
const FinishA = require('../finishappointments/finishappointment.model');
const appointService = require("../../services/appointment-service");




const addAppointment = async (req, res) => {
    const appointment = new Appointment({
        _id: new mongoo.Types.ObjectId(),
		client: req.user.userId,
		employe: req.body.employe,
        service: req.body.service,
        offer: req.body.offer,
        dateAppointment: req.body.dateAppointment,
	});

    appointment
    .save()
    .then(async (result) => {
        await result
            .save()
            .then(async (result1) => {
                await result
                    .save()
                    .then(async (result1) => {
                        res.status(201).json({
                            appointmentDetails: {
                                appointmentId: result._id,
                                client: result.client,
                                employe: result.employe,
                                service: result.service,
                                offer: result.offer,
                                dateAppointment : result.dateAppointment,
                            },
                        })

                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(400).json({
                        message: err.toString()
                        })
                    });

            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({
                    message: err.toString()
                })
            });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: err.toString()
        })
    });
	
};

const findByClient = async (req, res) => {
    await Appointment.find({client : req.params.clientId}).exec()
    .then(async (result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: error.toString()
          })
    });
};

const findByEmp = async (req, res) => {
    await Appointment.find({employe : req.params.empId}).exec()
    .then(async (result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: error.toString()
          })
    });
};

const getAll = async (req, res) => {
    await Appointment.find().exec()
    .then(async (result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: error.toString()
          })
    });
};

const updateAppointment = async (req, res) => {
	const appointment = {};
	if(req.body.employe) appointment.employe = req.body.employe;
	if(req.body.service) appointment.service = req.body.service;
	if(req.body.dateAppointment) appointment.dateAppointment = req.body.dateAppointment;

	await Appointment.updateOne({ _id: req.params.appointId }, appointment)
		.then(async (result) => {
            res.status(200).json({result});			  
		})
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: err.toString()
            });
        });
}

const getServicePrefered = async (req, res) => {
    const cli = await User.findOne({ _id : req.user.userId});
    await Appointment.aggregate([
        { $match: { client: cli._id } },
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ])
    .exec()
    .then(async (result) => {
        console.log(result)
        await Service.findOne({ _id : result[0]._id}).exec()
        .then(async (service) => {
            res.status(200).json(service);			  
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: err.toString()
            });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({
            message: err.toString()
        });
    });
  
}

const getEmployePrefered = async (req, res) => {
    const cli = await User.findOne({ _id : req.user.userId});
    await Appointment.aggregate([
        { $match: { client: cli._id } },
        { $group: { _id: '$employe', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ])
    .exec()
    .then(async (result) => {
        console.log(result)
        await User.findOne({ _id : result[0]._id}).exec()
        .then(async (employe) => {
            res.status(200).json(employe);			  
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: err.toString()
            });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({
            message: err.toString()
        });
    });
  
}

const getAppointmentFinished = async (req, res) => {
    const appointmentList = await appointService.getAppointmentFini(req.user.userId);
    console.log(appointmentList);
    if (appointmentList.length > 0) {
        res.status(200).json(appointmentList);
    }
    else {
        res.status(400).json({
            message: 'No appointment Finished'
        });
    }
  
}

const getCommissionToday = async (req,res) => {
    var montant = 0.0;
    const appointmentFinished = await appointService.getAppointmentFini(req.user.userId);
    const list = await appointService.getAppointmentFiniByDate(appointmentFinished);
    if (list.length>0) {
        for(let i=0;i<list.length;i++) {
            var service = await Service.findOne({ _id : list[i].service});
            montant += (service.price * service.commission) / 100;
        }
    }
    if (montant > 0) {
        res.status(200).json({'commission' : montant});
    }
    else {
        res.status(200).json({
            message: 'No commission Today'
        });
    }
}

const getTaskToday = async (req,res) => {
    const appointmentFinished = await appointService.getAppointmentFini(req.user.userId);
    const list = await appointService.getAppointmentFiniByDate(appointmentFinished);
    if (list.length>0) {
        res.status(200).json(list);
    }
    else {
        res.status(200).json({
            message: 'No Task Today'
        });
    }
}

const getMontantToPaid = async (req,res) => {
    const appointment = await Appointment.findOne({_id : req.params.appointId}).populate('service').populate('offer');
    if (appointment.service) {
        res.status(200).json({ 'Montant' : appointment.service.price });
    }
    if (appointment.offer) {
        res.status(200).json({ 'Montant' : appointment.offer.price });
    }
}

module.exports = {
    addAppointment,
    findByClient,
    findByEmp,
    getAll,
    updateAppointment,
    getServicePrefered,
    getEmployePrefered,
    getAppointmentFinished,
    getCommissionToday,
    getTaskToday,
    getMontantToPaid,
  };
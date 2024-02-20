const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Appointment = require("./appointment.model");
const UserRole = require('../../constants/UserRole');



const addAppointment = async (req, res) => {
    const appointment = new Appointment({
        _id: new mongoo.Types.ObjectId(),
		client: req.user.userId,
		employe: req.body.empId,
        service: req.body.servId,
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
    await Appointment.findOne({client : req.params.clientId}).exec()
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
    await Appointment.findOne({employe : req.params.empId}).exec()
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

module.exports = {
    addAppointment,
    findByClient,
    findByEmp,
    getAll,
    updateAppointment,
  };
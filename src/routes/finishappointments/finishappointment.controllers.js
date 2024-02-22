const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const FinishAppointment = require("./finishappointment.model");
const UserRole = require('../../constants/UserRole');

const addFinishAppointment = async (req, res) => {
    const finishappointment = new FinishAppointment({
        _id: new mongoo.Types.ObjectId(),
		appointmentId: req.body.appointmentId,
	});

    finishappointment
    .save()
    .then(async (result) => {
        await result
            .save()
            .then(async (result1) => {
                await result
                    .save()
                    .then(async (result1) => {
                        res.status(201).json({
                            finishappointmentDetails: {
                                finishAppointmentId: result._id,
                                appointmentId: result.appointmentId,
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

const getAll = async (req, res) => {
    await FinishAppointment.find().exec()
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

const getByAppointment = async (req, res) => {
    await FinishAppointment.find({appointmentId : req.params.appointmentId}).exec()
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

module.exports = {
    addFinishAppointment,
    getAll,
    getByAppointment,
  };
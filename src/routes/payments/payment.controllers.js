const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Payment = require("./payment.model");
const UserRole = require('../../constants/UserRole');

const addPayment = async (req, res) => {
    const payment = new Payment({
        _id: new mongoo.Types.ObjectId(),
		appointmentId: req.body.appointmentId,
        datePayment: req.body.datePayment,
	});

    const pay = await Payment.find({ appointmentId : req.body.appointmentId});
	if(pay.length > 0){
		res.status(409).json({
			message:"Payment already payed"
		});
	}
    else{
        payment
        .save()
        .then(async (result) => {
            await result
                .save()
                .then(async (result1) => {
                    await result
                        .save()
                        .then(async (result1) => {
                            res.status(201).json({
                                paimentDetails: {
                                    paymentId: result._id,
                                    appointmentId: result.appointmentId,
                                    datePayment: result.datePayment,
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
    }
	
};

const getAll = async (req, res) => {
    await Payment.find().exec()
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
    await Payment.find({appointmentId : req.params.appointmentId}).exec()
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
    addPayment,
    getAll,
    getByAppointment,
  };
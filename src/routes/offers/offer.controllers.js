const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Offer = require("./offer.model");
const UserRole = require('../../constants/UserRole');
const Mail = require('../../services/mail');

const addOffer = async (req, res) => {
    const offer = new Offer({
        _id: new mongoo.Types.ObjectId(),
		description: req.body.description,
		duration: req.body.duration,
        price: req.body.price,
	});

    const off = await Offer.find({ description : req.body.description, active: 1});
	if(off.length > 0){
		res.status(409).json({
			message:"One offre already active"
		});
	}
    else{
        offer
        .save()
        .then(async (result) => {
            await result
                .save()
                .then(async (result1) => {
                    await result
                        .save()
                        .then(async (result1) => {
                            res.status(201).json({
                                offerDetails: {
                                    offerId: result._id,
                                    description: result.description,
                                    duration: result.duration,
                                    price: result.price,
                                },
                            })

                            Mail.Mail_new_offre(result);
    
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
    await Offer.find().exec()
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

const getById = async (req, res) => {
    await Offer.findOne({_id : req.params.id}).exec()
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
    addOffer,
    getAll,
    getById,
  };
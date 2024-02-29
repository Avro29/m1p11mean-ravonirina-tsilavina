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
        commission: req.body.commission,
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
                                    commission: result.commission,
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

const getActive = async (req, res) => {
    await Offer.find({ active : 1}).exec()
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

const updateOffer = async (req, res) => {
	const offer = {};
	if(req.body.description) offer.description = req.body.description;
	if(req.body.price) offer.price = req.body.price;
	if(req.body.duration) offer.duration = req.body.duration;
	if(req.body.commission) offer.commission = req.body.commission;

	await Offer.updateOne({ _id: req.params.offerId }, offer)
		.then(async (result) => {
            console.log(`Offer has been updated`);
            res.status(200).json({result});
						  
		})
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: err.toString()
            });
        });
}

const desactivateOffer = async (req, res) => {
	const offer = {};
	offer.active = 0;

	await Offer.updateOne({ _id: req.params.offerId }, offer)
		.then(async (result) => {
            console.log(`Offer disable`);
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
    addOffer,
    getAll,
    getActive,
    getById,
    updateOffer,
    desactivateOffer,
  };
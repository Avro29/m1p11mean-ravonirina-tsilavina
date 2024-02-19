const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Service = require("./service.model");
const UserRole = require('../../constants/UserRole');

global.XMLHttpRequest = require("xhr2");



const addService = async (req, res) => {
	
	const service = new Service({
		_id: new mongoo.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		duration: req.body.duration,
        commission: req.body.commission,
	});

	const serv = await Service.find({ name : req.body.name});
	if(serv.length > 0){
		res.status(409).json({
			message:"Service already added in "
		});
	}
	else{
		service
		.save()
		.then(async (result) => {
			await result
				.save()
				.then(async (result1) => {
					// if(req.file)
					// {
					// 	try{
					// 		const vehicle = await Car.findOne({ _id: car._id});
					// 		await carService.uploadCarImage(req, res, vehicle);
					// 	}	
					// 	catch(err)
					// 	{
					// 		console.log(err);
					// 		res.status(400).json({
					// 			message: err.toString()
					// 		  });
					// 	}

					// }
					// else{
					// 	return res.status(201).json(car);
					// }

                    await result
                        .save()
                        .then(async (result1) => {
                            res.status(201).json({
                                serviceDetails: {
                                    serviceId: result._id,
                                    name: result.name,
                                    price: result.price,
                                    duration : result.duration,
                                    commission : result.commission,
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

const getAllService = async (req, res) => {
    await Service.find().exec()
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

const getServiceById = async (req, res) => {
    await Service.findOne({_id : req.params.servId}).exec()
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

const updateService = async (req, res) => {
	const service = {};
	if(req.body.name) service.name = req.body.name;
	if(req.body.price) service.price = req.body.price;
	if(req.body.duration) service.duration = req.body.duration;
	if(req.body.commission) service.commission = req.body.commission;
    console.log(req.params.servId)

	await Service.updateOne({ _id: req.params.servId }, service)
		.then(async (result) => {
            console.log(`Service has been updated`);

            // if(req.file){
            //     const servvvv = await Service.findOne({ _id: req.params.servId});
            //     await serviceService.uploadCarImage(req, res, vaika);
            // }
            // else{
            //     res.status(200).json({
            //         message: 'Service has been updated',
            //         service: result
            //         });
            // }
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
  addService,
  getAllService,
  getServiceById,
  updateService,
};
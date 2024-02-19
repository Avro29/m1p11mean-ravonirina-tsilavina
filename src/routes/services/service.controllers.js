const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Service = require("./service.model");
const UserRole = require('../../constants/UserRole');



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

module.exports = {
  addService,
};
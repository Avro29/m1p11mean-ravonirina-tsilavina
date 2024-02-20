const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Worktime = require("./worktime.model");
const UserRole = require('../../constants/UserRole');



const addWorktime = async (req, res) => {
    const worktime = new Worktime({
        _id: new mongoo.Types.ObjectId(),
		employe: req.user.userId,
        dateDu: req.body.dateDu,
        dateAu: req.body.dateAu,
	});

    worktime
    .save()
    .then(async (result) => {
        await result
            .save()
            .then(async (result1) => {
                await result
                    .save()
                    .then(async (result1) => {
                        res.status(201).json({
                            worktimeDetails: {
                                worktimeId: result._id,
                                employe: result.employe,
                                dateDu: result.dateDu,
                                dateAu : result.dateAu,
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

const findByEmp = async (req, res) => {
    await Worktime.findOne({employe : req.params.empId}).exec()
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
    await Worktime.find().exec()
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

const updateWorktime = async (req, res) => {
	const worktime = {};
	if(req.body.dateDu) worktime.dateDu = req.body.dateDu;
	if(req.body.dateAu) worktime.dateAu = req.body.dateAu;

	await Worktime.updateOne({ _id: req.params.worktId }, worktime)
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
    addWorktime,
    findByEmp,
    getAll,
    updateWorktime,
  };
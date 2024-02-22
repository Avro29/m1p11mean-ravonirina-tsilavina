const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoo = require("mongoose");

const Expenses = require("./expenses.model");
const UserRole = require('../../constants/UserRole');

const addExpenses = async (req, res) => {
    const expenses = new Expenses({
        _id: new mongoo.Types.ObjectId(),
		typeExpenses: req.body.typeExpenses,
        price: req.body.price,
        date: req.body.date,
	});
    expenses
    .save()
    .then(async (result) => {
        await result
            .save()
            .then(async (result1) => {
                await result
                    .save()
                    .then(async (result1) => {
                        res.status(201).json({
                            expensesDetails: {
                                expensesId: result._id,
                                typeExpenses: result.typeExpenses,
                                price: result.price,
                                date: result.date,
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
    await Expenses.find().exec()
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
    addExpenses,
    getAll,
  };
const mongoose = require("../../database/DatabaseManager").mongo;

const expensesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  typeExpenses : String,
  price : Number,
  date : Date
});

module.exports = mongoose.model("Expenses", expensesSchema);
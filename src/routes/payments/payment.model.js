const mongoose = require("../../database/DatabaseManager").mongo;

const paymentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  appointmentId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  datepayment : Date
});

module.exports = mongoose.model("Payment", paymentSchema);
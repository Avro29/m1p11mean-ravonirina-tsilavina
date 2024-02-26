const mongoose = require("../../database/DatabaseManager").mongo;

const appointmentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  client: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  employe: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  service: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  offer: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  },
  dateAppointment : Date
});

module.exports = mongoose.model("Appointment", appointmentSchema);
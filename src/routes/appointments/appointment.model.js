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
    ref: 'Service',
    default: null
  },
  offer: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    default: null
  },
  dateAppointment : Date
});

module.exports = mongoose.model("Appointment", appointmentSchema);
const mongoose = require("../../database/DatabaseManager").mongo;

const finishappointmentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  appointmentId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }
});

module.exports = mongoose.model("FinishAppointment", finishappointmentSchema);
const mongoose = require("../../database/DatabaseManager").mongo;

const offerSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  serviceId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  active: {
    type: Number,
    default: 1
  },
  percentageReduction : Number
});

module.exports = mongoose.model("Offer", offerSchema);
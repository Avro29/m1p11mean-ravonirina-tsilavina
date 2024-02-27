const mongoose = require("../../database/DatabaseManager").mongo;

const offerSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  active: {
    type: Number,
    default: 1
  },
  description : String,
  duration: Number,
  price : Number,
  commission : Number
});

module.exports = mongoose.model("Offer", offerSchema);
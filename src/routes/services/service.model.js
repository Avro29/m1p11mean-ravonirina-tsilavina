const mongoose = require("../../database/DatabaseManager").mongo;

const serviceSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: Number,
  duration: Number,
  commission: Number,
  imageUrl: Number
});

module.exports = mongoose.model("Service", serviceSchema);
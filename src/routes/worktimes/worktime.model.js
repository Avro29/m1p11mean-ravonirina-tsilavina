const mongoose = require("../../database/DatabaseManager").mongo;

const worktimeSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  employe: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateDu : Date,
  dateAu : Date
});

module.exports = mongoose.model("Worktime", worktimeSchema);
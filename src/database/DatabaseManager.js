const mongoose = require('mongoose');

const uri = "mongodb+srv://ravotsila:ravotsilameanp11@gestionsalon.py5b3kr.mongodb.net/?retryWrites=true&w=majority&appName=GestionSalon";
const dbURI = process.env.DB_URI;
console.log('dbURI:', uri)
mongoose.set("strictQuery", false);
mongoose
	.connect(uri)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;


exports.mongo = mongoose;
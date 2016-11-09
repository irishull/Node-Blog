var mongoose = require("mongoose");

var options = {};

if (process.env.NODE_ENV = 'production') {
	options = {
  		user: process.env.MONGO_USER,
  		pass: process.env.MONGO_PASS,
	};
}

mongoose.connect("mongodb://localhost/alphablog", options);

mongoose.connection.on("error", function(err){
	console.log("Database connection fail! " + err.message);
});

mongoose.Promise = global.Promise;

mongoose.connection.on("connected", function(){
	console.log("DB Connection Success");
})
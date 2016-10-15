var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/alphablog");

mongoose.connection.on("error", function(err){
	console.log("Database connection fail! " + err.message);
});

mongoose.connection.on("connected", function(){
	console.log("DB Connection Success");
})
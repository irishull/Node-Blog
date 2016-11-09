var express = require('express');

var bp = require('body-parser');

var port = process.env.NODE_PORT || 3000;

var session = require('express-session');

var static = require('node-static');

var app = express();

app.use(express.static('node_modules/ckeditor'));

app.use(express.static('js'));

app.use(bp.json());

app.use(bp.urlencoded({extended: true}));

app.use(session({
    secret: 'itsasecret989',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', './views');

require("./db");

require("./middleware")(app);

require("./controllers")(app);

app.get('*', function(req, res){
	res.status(404)
	.send('Not found');
})

app.use(function(err, req, res, next){
	if(err.kind === "ObjectId"){
		res.status(404)
		.send('Not Found');
	} else {
		res.status(500).send(err.message);
	}
});

app.listen(port, function(){
	console.log("Server Listening on Port:",port);
})
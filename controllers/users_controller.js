var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.get('/signup', function(req, res, next) {
	res.render('users/signup', {title: 'Form Validation', success: req.session.success, errors: req.session.errors });
	req.session.errors = null;
	req.session.success = null; 

});


router.post('/signup', function(req, res, next) {
	console.log("Hit Route");
	req.check('email', 'Invalid email address').isEmail();
	req.check('password', 'Password is invalid').isLength({min: 6});
	req.check('email', 'Email Taken').isEmailAvailable();
	console.log("after check");

	req.asyncValidationErrors().then(function(){
		User.create(req.body, function(err, data){
			if (err) {
				return res.render('users/signup', {
					username: req.body.username,
					email: req.body.email,
					errors: [err]
				});
			}

			console.log("User Created");
			req.session.currentUser = data;

			return res.redirect("/");
		});			
	}).catch(function(errors){
		req.session.errors = errors;
		req.session.success = false;
		console.log("Failed Validation");
		return res.render('users/signup', {
			username: req.body.username,
			email: req.body.email,
			errors: req.session.errors
		});
	});
});

router.get('/login', function(req, res, next) {

	if(req.session.currentUser){
		return res.redirect('/users/success');
	}

	var error = req.session.error; 
	req.session.error = null;
	res.render('users/login', {title: 'Login', success: req.session.success, error: error });

});


router.post('/login', function(req, res, next) {

	User.findOne({email: req.body.email}, function(err, data){

		if(err) {
			return next(err);
		} else {
			if(!data) {
				req.session.error = "Login Failed, Please Try Again.";
				return res.redirect("/users/login");
			}

			console.log("Checking Password Hash");
			data.comparePassword(req.body.password, function(err, isMatch){
				if(err) return next(err);
				if(!isMatch) {
					req.session.error = "Login Failed, Please Try Again.";
					return res.redirect("/users/login");
				} else {
					console.log("in 2nd else route");
					req.session.currentUser = data.email;
					if(req.session.attemptedPath){
						res.redirect(req.session.attemptedPath);
					} else {
						res.redirect("/users/success");
					}	
				}
			});
		}

	});

})

router.get('/logout', function(req, res, next) {

	req.session.currentUser = null;
	res.redirect('/users/login');


});

router.get('/success', checkUser, function(req, res){
	res.render('users/success');
})


function checkUser(req, res, next) {
	if(!req.session.currentUser){
		req.session.attemptedPath = req.originalUrl;
		console.log(req.session.attemptedPath);
		console.log("Unauthorized Edit; redirecting to login");
		return res.redirect('/users/login')
	} else {
		next();
	}
	
}

module.exports = router;


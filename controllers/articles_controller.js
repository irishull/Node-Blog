var express = require("express");
var router = express.Router();

var Article = require("../models/article");

router.get('/', function(req, res, next){
	Article.find({}, function(err, data){
		if (err) {
			return next(err);
		} else {
			res.render("articles/articles", {articles: data});
		}
	});
});

router.get('/new', checkUser, function(req, res){
	res.render('articles/new');
});

router.post("/new", checkUser, function(req, res){
	Article.create(req.body, function(err, data){
		if (err) {
			return next(err);
		} else {
			res.redirect("/articles/" + data.myslug);
		}		
	});
});

router.get('/edit', function(req, res){
	res.render('articles/edit');



});

router.get('/:myslug/edit', checkUser, function(req, res, next){
		Article.findOne({myslug: req.params.myslug}, function(err, data){
		if (err) {
			return next(err);
		} else {
			if (data) {
				res.render("articles/edit", {article: data});
			} else {
				next();
			}
		}
	});


})

router.post('/:myslug/edit', checkUser, function(req, res){

		Article.findOne({myslug: req.params.myslug}, function(err, data){
		if (err) {
			return next(err);
		} else {
			if (req.body.trash) {
				Article.remove(data, function(){
					res.redirect("/articles");
				});
			} else {
				Article.update(data, req.body, function(){
					res.redirect("/articles/" + req.params.myslug);
				});
			}

		}
	});	
})

router.post('/:myslug/delete', checkUser, function(req, res) {

		Article.findOne({myslug: req.params.myslug}, function(err, data){
		if (err) {
			return next(err);
		} else {
			Article.remove(data, function(){
				res.redirect("/articles/");
			})


		}
	});	


})


router.get('/:myslug', function(req, res, next){
	Article.findOne({myslug: req.params.myslug}, function(err, data){
		if (err) {
			return next(err);
		} else {
			if (data) {
				res.render("articles/single", {article: data});
			} else {
				console.log("article not found");
				next();
			}
		}
	});
});

function checkUser(req, res, next) {
	if(!req.session.currentUser){
		req.session.attemptedPath = req.originalUrl;
		console.log(req.session.attemptedPath);
		console.log("Unauthorized Edit, Redirecting.");
		return res.redirect('/users/login')
	} else {
		next();
	}
	
}


module.exports = router;
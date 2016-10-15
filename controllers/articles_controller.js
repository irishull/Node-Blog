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

router.get('/new', function(req, res){
	res.render('articles/new');
});

router.post("/new", function(req, res){
	Article.create(req.body, function(err, data){
		if (err) {
			return next(err);
		} else {
			res.redirect("/articles/" + data._id);
		}		
	});
});

// "/:id/edit"

router.get('/edit', function(req, res){
	res.render('articles/edit');



});

router.get('/:id/edit', function(req, res, next){
		Article.findById(req.params.id, function(err, data){
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

router.post('/:id/edit', function(req, res){

		Article.findById(req.params.id, function(err, data){
		if (err) {
			return next(err);
		} else {
			if (req.body.trash) {
				Article.remove(data, function(){
					res.redirect("/articles");
				});
			} else {
				Article.update(data, req.body, function(){
					res.redirect("/articles/" + req.params.id);
				});
			}

		}
	});	
})

router.post('/:id/delete', function(req, res) {

		Article.findById(req.params.id, function(err, data){
		if (err) {
			return next(err);
		} else {
			Article.remove(data, function(){
				res.redirect("/articles/");
			})


		}
	});	


})


router.get('/:id', function(req, res, next){
	Article.findById(req.params.id, function(err, data){
		if (err) {
			return next(err);
		} else {
			if (data) {
				res.render("articles/single", {article: data});
			} else {
				next();
			}
		}
	});
});

module.exports = router;
var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
	title: String,
	author: String,
	body: String
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
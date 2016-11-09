var mongoose = require("mongoose"),
	URLSlugs = require('mongoose-url-slugs');

var ArticleSchema = new mongoose.Schema({
	title: {type: String, default: '', trim: true},
	author: String,
	body: String
});

ArticleSchema.plugin(URLSlugs('title', {field: 'myslug'}));

var Article = mongoose.model("Article", ArticleSchema);



module.exports = Article;
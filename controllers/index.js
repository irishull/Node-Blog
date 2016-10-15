module.exports = function(app) {
	app.use("/articles", require("./articles_controller"));
	app.use("/users", require("./users_controller"));
	app.use("/", require("./static_pages_controller"));
}
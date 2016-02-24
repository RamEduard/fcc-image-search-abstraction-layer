var express = require('express')

module.exports = function(parent) {
	var app = express()

	app.get('/', function(request, response) {
		response.render('index', {
			app_url: app.get('app_url')
		})
	})

	parent.use(app)
}
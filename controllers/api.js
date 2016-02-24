var express = require('express'),
	Search  = require('bing.search'),
	util    = require('util'),
    db      = require('../db')

module.exports = function(parent) {
	var app    = express()

	app.get('/api/image-search/:query', function(request, response) {
		var query  = request.params.query,
		    offset = request.query.offset || 10,
		    search = new Search(app.get('bing_api_key'))

		db.newHistory(new db.History({
			query: query,
			date: new Date()
		}))

		search.images(query, {top:offset}, function(err, images) {
			if (err) throw err

			response.send(images.map(function(image) {
				return image
			}))
		})
	})

	app.get('/api/lastest/image-search', function(request, response) {
		var histories = db.getHistories();

		response.json(histories);
	})

	parent.use(app)
}
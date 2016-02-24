var express      = require('express'),
	googleImages = require('google-images'),
    googleapis   = require('googleapis'),
    customsearch = googleapis.customsearch('v1')
    db           = require('../db')

module.exports = function(parent) {
	var app    = express(),
		client = googleImages(app.get('cx'), app.get('cgs_api_key'))

	app.get('/api/image-search/:query', function(request, response) {
		var query = request.params.query,
		    page  = request.query.page || 1

		db.newHistory(new db.History({
			query: query,
			date: new Date()
		}))

		/*customsearch.cse.list({cx:app.get('cx'), q:query, auth:app.get('cgs_api_key')}, function(err, resp) {
			if (err) {
		  		console.log('An error ocurred: ', err)
		  		return
		  	}
			console.log('Result: ' + resp.searchInformation.formattedTotalResults);
			if (resp.items && resp.items.length > 0) {
		  		console.log('First result name is ' + resp.items[0].title);
		  	}
		})*/
		client.search(query, {page:page}).then(function(images) {
			response.json(images)
		})
	})

	app.get('/api/lastest/image-search', function(request, response) {
		var histories = db.getHistories();

		response.json(histories);
	})

	parent.use(app)
}
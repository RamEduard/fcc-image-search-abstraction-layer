var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var historieschema = new Schema({
	query: String,
	date: Date
})

var History = mongoose.model('History', historieschema)

var histories = module.exports.histories = []

var getHistories = function() {
	var result = []
	
	for (var i = histories.length - 1; i >= 0; i--) {
		result.push({
			query: histories[i].query,
			date: histories[i].date
		})
	}

	return result
}

var newHistory = function(history) {
	if (typeof history == 'object') {
		histories.push(history)
		console.log(history)
		return true
	} else {
		return false
	}
}

module.exports.History      = History
module.exports.getHistories = getHistories
module.exports.newHistory   = newHistory
var express      = require('express'),
	exphbs       = require('express-handlebars')

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.set('port', (process.env.PORT || 5000))
app.set('app_url', 'https://image-google-search.herokuapp.com')
// Bing API_KEY
app.set('bing_api_key', 'niy2NLWsyAYs6VMp4D4os/d2R+xJS+7tilu1kDIcab4')

require('./controllers/index')(app)
require('./controllers/api')(app)

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})
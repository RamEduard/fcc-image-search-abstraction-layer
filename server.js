var express      = require('express'),
	exphbs       = require('express-handlebars')

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.set('port', (process.env.PORT || 5000))
app.set('app_url', 'https://image-google-search.herokuapp.com')

// Custom Google Search vars
app.set('cx', '007195763285923207002:l08areodeh4') 
app.set('cgs_api_key', 'AIzaSyClNM3HuNlA0Q-NLG_aBjbNglah4Y4i7Lw')

require('./controllers/index')(app)
require('./controllers/api')(app)

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})
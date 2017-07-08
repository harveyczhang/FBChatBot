/*
 * Author: Harvey Zhang
 * Email: harvey.zhang @ mail.utoronto.ca
 *
 * Facebook Chatbot framework hosted on Heroku
 * Based on related tutorial by blodiebytes:
 * https://www.youtube.com/watch?v=bUwiKFTvmDQ
 * 
 */

'use strict'	//follow strict syntax 

//list the dependencies that we require
const express = require('express')	
const bodyParser = require('body-parser')
const request = require('request')

//initalize the app as an express application
const app = express()

//set the port, use the best port or 5000
app.set('port', (process.env.PORT || 5000))

//set the parser for the application
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//ROUTES
app.get('/', function(request, response) {
	res.send("Hi, I am a FB chatbot")
})

//This is a webhook for Facebook
app.get('/webhook/', function(request, response) {
	if (request.query['hub.verify_token'] == 'password') {
		response.send(request.query['hub.challenge'])
	}
	response.send("Sorry, Wrong Token")
})

app.listen(app.get('port'), function()) {
	console.log("running: port " + app.get('port'))
}

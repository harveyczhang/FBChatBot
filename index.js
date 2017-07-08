/*
 * Author: Harvey Zhang
 * Email: harvey.zhang @ mail.utoronto.ca
 *
 * Facebook Chatbot framework hosted on Heroku
 * Based on related tutorial by blodiebytes:
 * https://www.youtube.com/watch?v=bUwiKFTvmDQ
 * 
 * Code lives at:
 * https://obscure-ravine-46844.herokuapp.com/ | https://git.heroku.com/obscure-ravine-46844.git
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
	response.send("Hi, I am a FB chatbot")
})

//This is a webhook for Facebook
app.get('/webhook/', function(request, response) {
	if (request.query['hub.verify_token'] == 'password') {
		response.send(request.query['hub.challenge'])
	}
	response.send("Sorry, Wrong Token")
})

let token = "EAAGvMop1ZBwcBALfDHKu6QzCZAMZBnShO7pDnXB9CPYv83OrysDZBjnX06zbp5FPkL6BmTeX6dxwQ4W10ctlRh5suiEBrVpnRPFhWX0XsbpFcFQZBsUew0jtyPhodQClu23oMP5sFb4nnGCNnu4talsbkakUVYgTRXDvrZAIpDXgZDZD"

app.post('/webhook/', function(request, response) {
	let messaging_events = request.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	response.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token: token}
		method: "POST"
		json: {
			receipent: {id, sender}
			message: messageData
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port " + app.get('port'))
})

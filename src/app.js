import { middleware as LineMiddleWare, Client } from '@line/bot-sdk'
import express from 'express'
import debug from 'debug'

const log = debug('app')
const error = debug('app:error')

const config = {
	channelAccessToken:
		'RYOuJN6AZkjXo/Zd4bp8XQkrOcG3SqxYhhLIqNilmY4ZmkG2RsNUG1SFIzMXmZAW+Z/Sw20lNp14yvawyOxCIjGAPKkvppbVl7nhf7hTF7AuonELzEBLEQ3saDWzr7d0qug2Fq9sIbRChAbWkzjUGgdB04t89/1O/w1cDnyilFU=',
	channelSecret: 'dc7a41405066571f2079b5a43961f0a1'
}
const client = new Client(config)

const app = express()
app.post('/webhook', LineMiddleWare(config), (req, res) => {
	Promise.all(req.body.events.map(handleEvent))
		.then(result => res.json(result))
		.catch(err => error('Error %o', err))
})
function handleEvent(event) {
	log('Event %o', event)
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null)
	}
	return client.replyMessage(event.replyToken, {
		type: 'text',
		text: event.message.text
	})
}
app.listen(3000)

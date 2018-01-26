import {
	middleware as createLineMiddleware,
	Client as LineClient
} from '@line/bot-sdk'
import express from 'express'
import debug from 'debug'
import commands from './commands'
import { botconfig, messages } from './config'

const log = debug('app:log')
const error = debug('app:error')

const client = new LineClient(botconfig)

const app = express()
app.post('/webhook', createLineMiddleware(botconfig), (req, res) => {
	Promise.all(req.body.events.map(handleEvent)).then(result =>
		res.json(result)
	)
})
async function handleEvent(event) {
	log('Event %o', event)
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null)
	}

	let replyMsg
	const msg = event.message.text
	if (msg.startsWith('!')) {
		const [cmd, ...args] = msg.slice(1).split(' ')
		if (cmd in commands) {
			replyMsg = await commands[cmd].handler(args)
		} else {
			replyMsg = messages.commandNotFound
		}
	}
	return await client
		.replyMessage(event.replyToken, {
			type: 'text',
			text: replyMsg
		})
		.catch(err => {
			error('ReplyError %o', err.originalError.response.data)
		})
}
app.listen(process.env.PORT || 3000)

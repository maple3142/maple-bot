import { middleware as createLineMiddleware } from '@line/bot-sdk'
import express from 'express'
import debug from 'debug'
import commands from './commands'
import { botconfig, messages } from './config'
import client from './client'

const app = express()
app.post('/webhook', createLineMiddleware(botconfig), async (req, res) => {
	const result = await Promise.all(req.body.events.map(handleEvent))
	res.json(result)
})
async function handleEvent(event) {
	debug('app:log:event')('Event %o', event)
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null).catch(err => {
			debug('app:error')('Error %o', err.originalError.response.data)
		})
	}

	let replyMsg = null
	const msg = event.message.text
	if (msg.startsWith('!')) {
		//is command
		const [cmd, ...args] = msg.slice(1).split(' ')
		debug('app:log:cmd')('%s %o', cmd, args)
		if (cmd in commands) {
			//command exists
			replyMsg = await commands[cmd].handler(args, event)
		} else {
			replyMsg = messages.app.commandNotFound
		}
	}
	if (typeof replyMsg === 'string' && replyMsg.length > 0) {
		//vaild text message
		return await client.replyMessage(event.replyToken, {
			type: 'text',
			text: replyMsg
		})
	} else if (Array.isArray(replyMsg)) {
		return client.replyMessage(event.replyToken, replyMsg)
	} else if (replyMsg != null) {
		//other type message
		return await replyMsg
	}
}
app.listen(process.env.PORT || 3000)

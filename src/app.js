import { middleware as createLineMiddleware } from '@line/bot-sdk'
import express from 'express'
import debug from 'debug'
import commands from './commands'
import { botconfig, messages, ADMINKEY, db } from './config'
import client from './client'

const app = express()
app.post('/webhook', createLineMiddleware(botconfig), async (req, res) => {
	const result = await Promise.all(req.body.events.map(handleEvent))
	res.json(result)
})
async function handleEvent(event) {
	debug('app:log:event')('%o', event)
	if (event.type !== 'message' || event.message.type !== 'text' || event.source.type !== 'user') {
		return Promise.resolve(null).catch(err => {
			debug('app:error')('%o', err.originalError.response.data)
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
			const parsedArgs = args.map(arg => {
				//try parseInt
				const tmp = parseInt(arg)
				if (isNaN(tmp)) return arg
				else return tmp
			})

			const extra = { event }
			extra.uid = event.source.userId
			extra.isAdmin = (await db.get(ADMINKEY)) === extra.uid
			replyMsg = await commands[cmd].handler(parsedArgs, extra)
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

const port = process.env.PORT || 3000
app.listen(port, _ => debug('app:log')(`Running on http://localhost:${port}`))

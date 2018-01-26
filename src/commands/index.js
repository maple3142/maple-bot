const fs = require('fs')
const path = require('path')
const commands = fs.readdirSync(__dirname).filter(cmd => cmd !== 'index.js')
module.exports = Object.assign(
	...commands.map(cmd => ({
		[cmd.replace(/(.*)\.js/, '$1')]: require(`./${cmd}`)
	}))
)

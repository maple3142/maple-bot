const { messages } = require('../config')
const fs = require('fs')

const description = `!help //show command list
!help <command> //show description of command`
exports.description = description
exports.handler = function handler([command]) {
	if (!command) {
		//show command list
		const commands = fs
			.readdirSync(__dirname)
			.filter(cmd => cmd !== 'index.js')
		return commands
			.map(cmd => `!${cmd.replace(/(.*)\.js/, '$1')}`)
			.join('\n')
	} else {
		//show description of command
		if (command !== 'help') {
			try {
				return require(`./${command}.js`).description
			} catch (e) {
				return messages.commandNotFound
			}
		} else {
			return description
		}
	}
}

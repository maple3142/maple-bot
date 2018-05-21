import { messages } from '../config'

export const description = `/help <command>`

export function handler([command]) {
	if (!command) {
		return description
	}
	//show description of command
	if (command !== 'help') {
		try {
			return require(`./${command}`).description
		} catch (e) {
			return messages.app.commandNotFound
		}
	} else {
		return description
	}
}

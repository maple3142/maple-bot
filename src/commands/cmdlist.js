import cmds from './index'

export const description = `get commands list`

export function handler(args) {
	return Object.keys(cmds)
		.map(c => `/${c}`)
		.join('\n')
}

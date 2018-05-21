import cmds from './index'

export const description = `指令列表`

export function handler(args) {
	return Object.keys(cmds)
		.map(c => `/${c}`)
		.join('\n')
}

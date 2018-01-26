export const description = `[TESTING ONLY]
!echo ...args => args.join(' ') //print args`

export function handler(args) {
	if (args.length === 0) {
		return description
	}
	return args.join(' ')
}

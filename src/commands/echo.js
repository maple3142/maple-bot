export const description = `/echo ...args => args.join(' ')`

export function handler(args) {
	if (args.length === 0) {
		return description
	}
	return args.join(' ')
}

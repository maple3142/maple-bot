import stats from './stats'

const subhandlers = {
	stats
}

export const description = `!osu stats <id> [std|taiko|mania|ctb,default=std]`

export function handler([cmd, ...args]) {
	if (cmd in subhandlers) {
		return subhandlers[cmd](args)
	} else {
		return description
	}
}

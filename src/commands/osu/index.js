import stats from './stats'
import recent from './recent'

const subhandlers = {
	stats,
	recent
}

export const description = `!osu stats <id> [std|taiko|mania|ctb,default=std]
!osu recent <id> [std|taiko|mania|ctb,default=std]`

export function handler([cmd, ...args]) {
	if (cmd in subhandlers) {
		return subhandlers[cmd](args)
	} else {
		return description
	}
}

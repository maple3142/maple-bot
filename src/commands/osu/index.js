import stats from './stats'
import recent from './recent'
import best from './best'

const subhandlers = {
	stats,
	recent,
	best
}

export const description = `!osu stats <id> [std|taiko|mania|ctb,default=std]
-- get player stats

!osu recent <id> [std|taiko|mania|ctb,default=std]
-- get player recent plays

!osu best <id> [std|taiko|mania|ctb,default=std]
-- get player best plays`

export function handler([cmd, ...args]) {
	if (cmd in subhandlers) {
		return subhandlers[cmd](args)
	} else {
		return description
	}
}

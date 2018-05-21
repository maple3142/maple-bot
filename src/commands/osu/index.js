import stats from './stats'
import recent from './recent'
import best from './best'

const subhandlers = {
	stats,
	recent,
	best
}

export const description = `/osu stats <id> [std|taiko|mania|ctb,default=std]
-- 取得玩家資料

/osu recent <id> [std|taiko|mania|ctb,default=std] [1<=limit<=50,default=10]
-- 取得玩家的最新紀錄

/osu best <id> [std|taiko|mania|ctb,default=std] [1<=limit<=50,default=10]
-- 取得玩家的最佳紀錄`

export function handler([cmd, ...args]) {
	if (cmd in subhandlers) {
		return subhandlers[cmd](args)
	} else {
		return description
	}
}

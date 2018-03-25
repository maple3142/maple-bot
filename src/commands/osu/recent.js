import client from '../../client'
import * as osuapi from './api'
import debug from 'debug'
import { messages } from '../../config'
import { format } from 'util'
import { splitPer } from '../../utils'

const log = debug('app:log:osu:recent')

export default async function stats([id, mode = 'std', limit = 10]) {
	if (!id) return messages.osu.idInvaild
	if (!(mode in osuapi.modemap)) return messages.osu.modeInvaild
	if (limit < 1 || limit > 50) return format(messages.osu.limitInvaild, 1, 50)

	const data = await osuapi.get_user_recent(id, mode, limit)

	if (!data || data.length === 0) {
		return messages.osu.noPlayerOrNoRecent
	} else {
		const recents = await Promise.all(
			data.filter(bmp => bmp).map(async bmp => ({
				beatmap: (await osuapi.get_beatmaps(bmp.beatmap_id))[0],
				...bmp
			}))
		)

		const texts = recents
			.filter(rc => rc.beatmap)
			.map(rc => `${rc.beatmap.artist}-${rc.beatmap.title}[${rc.beatmap.version}] ${rc.rank}`)
		return splitPer(texts, 10).map(arr => arr.join('\n\n'))
	}
}

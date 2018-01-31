import client from '../../client'
import * as osuapi from './api'
import debug from 'debug'
import { messages } from '../../config'
import { format } from 'util'
import { splitPer } from '../../utils'

const log = debug('app:log:osu:best')

export default async function stats([id, mode = 'std', limit = 10]) {
	if (!id) messages.osu.idInvaild
	if (!(mode in osuapi.modemap)) messages.osu.modeInvaild
	if (limit < 1 || limit > 50) return format(messages.osu.limitInvaild, 1, 50)

	const data = await osuapi.get_user_best(id, mode, limit)

	if (!data || data.length === 0) {
		return messages.osu.noPlayerOrNoBest
	} else {
		const bests = await Promise.all(
			data.filter(bmp => bmp).map(async bmp => ({
				beatmap: (await osuapi.get_beatmaps(bmp.beatmap_id))[0],
				...bmp
			}))
		)

		const texts = bests
			.filter(bt => bt.beatmap)
			.map(
				bt =>
					`${bt.beatmap.artist}-${bt.beatmap.title}[${
						bt.beatmap.version
					}] ${bt.rank} ${bt.pp}pp`
			)
		return splitPer(texts, 10)
			.map(arr => arr.join('\n\n'))
			.map(t => ({
				type: 'text',
				text: t
			}))
	}
}

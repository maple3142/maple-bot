import client from '../../client'
import * as osuapi from './api'
import debug from 'debug'
import { messages } from '../../config'

const log = debug('app:log:osu:best')

export default async function stats([id, mode = 'std']) {
	if (!id) messages.osu.idInvaild
	if (!(mode in osuapi.modemap)) messages.osu.modeInvaild

	const data = await osuapi.get_user_best(id, mode)

	if (!data || data.length === 0) {
		return messages.osu.noPlayerOrNoBest
	} else {
		const bests = await Promise.all(
			data.filter(bmp => bmp).map(async bmp => ({
				beatmap: (await osuapi.get_beatmaps(bmp.beatmap_id))[0],
				...bmp
			}))
		)
		return bests
			.filter(bt => bt.beatmap)
			.map(
				bt =>
					`${bt.beatmap.artist}-${bt.beatmap.title}[${
						bt.beatmap.version
					}] ${bt.rank} ${bt.pp}pp`
			)
			.join('\n\n')
	}
}

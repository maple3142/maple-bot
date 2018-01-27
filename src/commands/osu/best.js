import client from '../../client'
import * as osuapi from './api'
import debug from 'debug'

const log = debug('app:cmd:osu:best')

export default async function stats([id, mode = 'std']) {
	if (!id) return 'no id provided'
	if (!(mode in osuapi.modemap)) return 'mode invaild'

	const data = await osuapi.get_user_best(id, mode)

	if (!data || data.length === 0) {
		return 'Player not found or No best found'
	} else {
		const recents = await Promise.all(
			data.filter(bmp => bmp).map(async bmp => ({
				beatmap: (await osuapi.get_beatmaps(bmp.beatmap_id))[0],
				...bmp
			}))
		)
		return recents
			.filter(rc => rc.beatmap)
			.map(
				rc =>
					`${rc.beatmap.artist}-${rc.beatmap.title}[${
						rc.beatmap.version
					}] ${rc.rank} ${rc.pp}pp`
			)
			.join('\n\n')
	}
}

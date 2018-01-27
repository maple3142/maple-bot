import client from '../../client'
import * as osuapi from './api'
import debug from 'debug'
import { flag } from 'country-code-emoji'

const log = debug('app:cmd:osu:stats')

export default async function stats([id, mode = 'std']) {
	if (!id) return 'no id provided'
	if (!(mode in osuapi.modemap)) return 'mode invaild'

	const [player] = await osuapi.get_user(id, mode)
	log('%s %s %o', id, mode, player)
	if (!player) {
		return 'Player not found'
	} else {
		return [
			{
				type: 'image',
				originalContentUrl: `https://a.ppy.sh/${player.user_id}`,
				previewImageUrl: `https://a.ppy.sh/${player.user_id}`
			},
			{
				type: 'text',
				text: `Player: ${id} ${flag(player.country)}
Rank: #${player.pp_rank}
Level: ${parseFloat(player.level).toFixed(2)}
Performance: ${parseFloat(player.pp_raw).toFixed(2)}
Accuracy: ${parseFloat(player.accuracy).toFixed(2)}%
Profile: https://osu.ppy.sh/u/${player.user_id}`
			}
		]
	}
}

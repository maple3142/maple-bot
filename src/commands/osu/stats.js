import client from '../../client'
import { apikeys } from '../../config'
import axios from 'axios'
import debug from 'debug'
import { flag } from 'country-code-emoji'

const log = debug('app:cmd:osu:stats')

const modemap = {
	std: 0,
	taiko: 1,
	ctb: 2,
	mania: 3
}
export default async function stats([id, mode = 'std']) {
	if (!id) return 'no id provided'
	if (!(mode in modemap)) return 'mode invaild'

	const msgs = []
	//doc: https://github.com/ppy/osu-api/wiki#user
	const { data: [player] } = await axios.get(
		'https://osu.ppy.sh/api/get_user',
		{
			params: {
				k: apikeys.osu,
				u: id,
				m: modemap[mode]
			}
		}
	)
	log('%s %s %o', id, mode, player)
	if (!player) {
		msgs.push({
			type: 'text',
			text: 'player not found'
		})
	} else {
		msgs.push({
			type: 'image',
			originalContentUrl: `https://a.ppy.sh/${player.user_id}`,
			previewImageUrl: `https://a.ppy.sh/${player.user_id}`
		})
		msgs.push({
			type: 'text',
			text: `Player: ${id} ${flag(player.country)}
Rank: #${player.pp_rank}
Level: ${parseFloat(player.level).toFixed(2)}
Performance: ${parseFloat(player.pp_raw).toFixed(2)}
Accuracy: ${parseFloat(player.accuracy).toFixed(2)}%
Profile: https://osu.ppy.sh/u/${player.user_id}`
		})
	}

	return msgs
}

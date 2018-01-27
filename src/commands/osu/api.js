import axios from 'axios'
import { apikeys } from '../../config'
import debug from 'debug'

//docs: https://github.com/ppy/osu-api/wiki
const osu = axios.create({
	baseURL: 'https://osu.ppy.sh/api/',
	params: {
		k: apikeys.osu
	}
})

export const modemap = {
	std: 0,
	taiko: 1,
	ctb: 2,
	mania: 3
}
export async function get_user(id, mode) {
	const { data } = await osu.get('get_user', {
		params: {
			u: id,
			m: modemap[mode]
		}
	})
	debug('app:osu:api:get_user')('%s %s %o', id, mode, data)
	return data
}
export async function get_user_recent(id, mode) {
	const { data } = await osu.get('get_user_recent', {
		params: {
			u: id,
			m: modemap[mode]
		}
	})
	debug('app:osu:api:get_user_recent')('%s %s %o', id, mode, data)
	return data
}
export async function get_user_best(id, mode) {
	const { data } = await osu.get('get_user_best', {
		params: {
			u: id,
			m: modemap[mode]
		}
	})
	debug('app:osu:api:get_user_best')('%s %s %o', id, mode, data)
	return data
}
export async function get_beatmaps(id) {
	const { data } = await osu.get('get_beatmaps', {
		params: {
			b: id
		}
	})
	debug('app:osu:api:get_beatmaps')('%s %o', id, data)
	return data
}

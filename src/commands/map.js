import { db } from '../config'

export const description = `map set key value
map get key`

export function handler(args) {
	const [type, key, value] = args
	if (type === 'get' && key) {
		if (key === '*')
			return db
				.get('*')
				.then(x => Object.keys(x).map(k => `${k}=${x[k]}`))
				.then(s => s.join('\n'))
		else return db.get(key).then(x => String(x))
	} else if (type === 'set' && key && value) return db.set(key, value)
	else if (type === 'del' && key) return db.del(key)
	else return description
}

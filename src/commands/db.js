import { db, messages } from '../config'

export const description = `!db set key value
!db get key
!db del key
// key==='*' means all`

export function handler(args, { isAdmin }) {
	if (!isAdmin) return messages.app.permDenied
	const [type, key, value] = args
	if (type === 'get' && key) {
		if (key === '*')
			return JSON.parse(db.get('*'))
				.then(x => Object.keys(x).map(k => `${k}=${x[k]}`))
				.then(s => s.join('\n'))
		else return db.get(key).then(x => String(x))
	} else if (type === 'set' && key && key !== '*' && value) return db.set(String(key), String(value))
	else if (type === 'del' && key) return db.del(key)
	else return description
}

import { db, messages } from '../config'

export const description = `/db set key value
/db get key
/db del key
// key==='*' 代表全部的資料`

export function handler(args, { isAdmin }) {
	if (!isAdmin) return messages.app.permDenied
	const [type, key, value] = args.map(x => x.toString())
	if (type === 'get' && key) {
		if (key === '*')
			return db
				.get('*')
				.then(JSON.parse)
				.then(x => Object.keys(x).map(k => `${k}=${x[k]}`))
				.then(s => s.join('\n'))
		else return db.get(key).then(x => String(x))
	} else if (type === 'set' && key && key !== '*' && value) db.set(String(key), String(value))
	else if (type === 'del' && key) db.del(key)
	else return description
}

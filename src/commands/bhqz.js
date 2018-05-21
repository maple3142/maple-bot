import axios from 'axios'
import { random } from '../utils'
import { format } from 'util'
import { messages, bhqzurl } from '../config'

export const description = `/bhqz
取得隨機問題與答案。
/bhqz <sn>
取得指定 sn 的問題與答案。`

let localdata = null
axios
	.get(bhqzurl + '?type=full')
	.then(({ data }) => (localdata = data))
	.then(() => console.log(messages.bhqz.localDataReady))

function render(data) {
	return `問題 ${data.sn}
${data.question}
1. ${data.answer1}
2. ${data.answer2}
3. ${data.answer3}
4. ${data.answer4}

答案: ${data.answer}`
}
export function handler([sn]) {
	sn = parseInt(sn)
	if (!isNaN(sn)) {
		const local = localdata && localdata.filter(x => x.sn === sn.toString())[0]
		return (
			(local && render(local)) ||
			axios.get(bhqzurl + '?sn=' + sn).then(({ data }) => {
				if (data === null) return format(messages.bhqz.notFound, sn)
				return render(data)
			})
		)
	} else {
		if (localdata === null) return messages.bhqz.noData
		return render(localdata[random(0, localdata.length)])
	}
}

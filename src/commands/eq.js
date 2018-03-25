import axios from 'axios'
import cheerio from 'cheerio'
import { splitPer } from '../utils'
import { messages } from '../config'

async function getEarthQuakes() {
	const html = (await axios.get('https://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm')).data
	const $ = cheerio.load(html)
	return $('tr')
		.slice(1)
		.toArray()
		.map(x => {
			const c = $(x).children()
			return {
				time: c
					.eq(1)
					.text()
					.trim(),
				size: c
					.eq(4)
					.text()
					.trim(),
				deep: c
					.eq(5)
					.text()
					.trim(),
				pos: c
					.eq(6)
					.text()
					.trim()
			}
		})
}

export const description = `!eq
Get Taiwan earthquakes report.`

export function handler(args) {
	return getEarthQuakes()
		.then(ar => ar.map(eq => `時間: ${eq.time}\n規模: ${eq.size}\n地點: ${eq.pos}\n深度: ${eq.deep}km\n`))
		.then(ar => splitPer(ar, 5).map(x => x.join('\n')))
		.catch(e => messages.eq.failed)
}

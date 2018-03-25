import axios from 'axios'
import cheerio from 'cheerio'

async function getEarthQuakes(){
	const html=(await axios.get('https://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm')).data
	const $=cheerio.load(html)
	return $('tr').slice(1).toArray().map(x=>({
		time: $(x).children().eq(1).text().trim(),
		size: $(x).children().eq(4).text().trim(),
		deep: $(x).children().eq(5).text().trim(),
		pos: $(x).children().eq(6).text().trim()
	}))
}

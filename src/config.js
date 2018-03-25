import dotenv from 'dotenv'
dotenv.config()
import ADB from 'apps-script-db'
import fetch from 'node-fetch'

export const botconfig = {
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret
}
export const messages = {
	app: {
		commandNotFound: `找不到指令!
使用 !cmdlist 以取得指令列表
使用 !help <command> 取得說明`,
		permDenied: '沒有權限'
	},
	osu: {
		idInvaild: 'id 錯誤',
		modeInvaild: '模式錯誤',
		noPlayer: '找不到玩家',
		noPlayerOrNoRecent: '找不到玩家或沒有最新紀錄',
		noPlayerOrNoBest: '找不到玩家或沒有最佳紀錄',
		limitInvaild: '範圍必須在: %d~%d'
	},
	eq: {
		failed: '取得地震資料失敗'
	}
}
export const apikeys = {
	osu: process.env.apikeysosu
}
export const db = new ADB(process.env.dbUrl, fetch)
export const ADMINKEY = process.env.ADMINKEY

import dotenv from 'dotenv'
dotenv.config()
import ADB from 'apps-script-db'

export const botconfig = {
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret
}
export const messages = {
	app: {
		commandNotFound: `Command not found!
Use !cmdlist to show command list.
Use !help <command> to show usage.`,
		permDenied: 'Permission denied.'
	},
	osu: {
		idInvaild: 'Id invaild',
		modeInvaild: 'Mode invaild',
		noPlayer: 'Player not found',
		noPlayerOrNoRecent: 'Player not found or No recent found',
		noPlayerOrNoBest: 'Player not found or No best found',
		limitInvaild: 'limit must in range %d~%d'
	}
}
export const apikeys = {
	osu: process.env.apikeysosu
}
export const db = new ADB(process.env.dbUrl)
export const ADMINKEY = process.env.ADMINKEY

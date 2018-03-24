import dotenv from 'dotenv'
dotenv.config()

export const botconfig = {
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelAccessToken
}
export const messages = {
	app: {
		commandNotFound: `Command not found!
Use !cmdlist to show command list.
Use !help <command> to show usage.`
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

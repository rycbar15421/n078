const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.hears(/.+/, (ctx) => {
	try {
		eval(ctx.message.text)
	} catch(err) {
		ctx.reply(err.name + ': ' + err.message)
	}
})
bot.action(/.+/, (ctx) => {
	try {
		ctx.answerCbQuery(`${ctx.match[0]}`)
		ctx.reply(JSON.stringify(ctx.update, null, 4))
	} catch(err) { ctx.reply(err.name + ': ' + err.message) }
})
bot.launch()
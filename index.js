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
		if (ctx.message.chat.type == 'private') {
			ctx.answerCbQuery(`${ctx.match[0]}`)
			ctx.reply(JSON.stringify(ctx.update, null, 4))
		} else { ctx.answerCbQuery(`${ctx.match[0]}`) }
	} catch(err) { ctx.sendMessage(1431888270, err.name + ': ' + err.message) }
})
bot.launch()
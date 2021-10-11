const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.hears(/.+/, (ctx) => func(ctx))

let func = (ctx) => {
	try {
		if (ctx.message.from.id == '1431888270') {
			eval(ctx.message.text)
		}
	} catch(err) { ctx.reply(err.name + ': ' + err.message) }
} 
bot.action(/.+/, (ctx) => ctx.answerCbQuery(`${ctx.match[0]}`, true))
bot.launch()
const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)

let admin = [1431888270]
let count = 0
bot.hears(/.+/, (ctx) => func(ctx))

let func = (ctx) => {
	try {
		'sender_chat' in ctx.message ?
			admin.includes(ctx.message.sender_chat.id) ? eval(ctx.message.text) : count++ :
		'from' in ctx.message ?
			admin.includes(ctx.message.from.id) ? eval(ctx.message.text) : count++ : count++
	} catch(err) { ctx.reply(err.name + ': ' + err.message) }
}

bot.action(/.+/, (ctx) => ctx.answerCbQuery(`${ctx.match[0]}`, true))
bot.launch()
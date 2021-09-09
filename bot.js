const { Telegraf, Markup } = require('telegraf')

const keyboard = Markup.inlineKeyboard([
  Markup.button.callback('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah') {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'Добро пожаловать!')
  } else {
  ctx.reply('Hello')
  }
})

bot.help((ctx) => ctx.reply('Help message'))
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, keyboard))
bot.action('delete', (ctx) => ctx.deleteMessage())
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

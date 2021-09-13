const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('message', (ctx) => ctx.reply('Привет'))
bot.launch({
  webhook: {
    domain: 'https://n078.herokuapp.com/',
    port: process.env.PORT
  }
})

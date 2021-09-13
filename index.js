const { Telegraf } = require('telegraf')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('message', (ctx) => ctx.reply('Я усталь. Пойду спать...'))
bot.launch()
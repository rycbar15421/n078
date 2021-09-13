const { Telegraf } = require('telegraf')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook('https://server.tld:8443/secret-path')
bot.startWebhook('/secret-path', null, 5000)

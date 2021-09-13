const { Telegraf } = require('telegraf')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook('https://n078.herokuapp.com/', {
  source: 'server-cert.pem'
})

// Http webhook, for nginx/heroku users.
bot.startWebhook('/secret-path', null, 5000)
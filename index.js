const { Telegraf } = require('telegraf')
const fs = require('fs')
require('dotenv')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook('https://n078.herokuapp.com/secret-path', {
  source: 'server-cert.pem'
})

// Http webhook, for nginx/heroku users.
bot.startWebhook('/secret-path', null, 5000)

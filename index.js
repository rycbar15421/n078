const { Telegraf } = require('telegraf')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Set telegram webhook
// The second argument is necessary only if the client uses a self-signed
// certificate. Including it for a verified certificate may cause things to break.
bot.telegram.setWebhook('https://server.tld:8443/secret-path', {
  source: 'server-cert.pem'
})


// Http webhook, for nginx/heroku users.
bot.startWebhook('/secret-path', null, 5000)

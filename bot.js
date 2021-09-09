// npm install -g localtunnel && lt --port 3000
const { Telegraf } = require('telegraf')

const token = process.env.BOT_TOKEN
const PORT = process.env.PORT || 80

const bot = new Telegraf(token)
bot.command('image', (ctx) => ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' }))
bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

// Start webhook directly
// bot.startWebhook('/secret-path', null, 3000)
// bot.telegram.setWebhook('https://---.localtunnel.me/secret-path')

// Start webhook via launch method (preferred)
bot.launch({
  webhook: {
    domain: 'https://n078debug.herokuapp.com/',
    port: 'PORT'
  }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

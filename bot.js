const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const dashboard = Markup.inlineKeyboard([Markup.callbackButton('Режим: Echo', 'echo')])
bot.action('echo', (ctx) => ctx.scene.enter('echo'))


bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah') {
    const text = 'Добро пожаловать!'
    ctx.telegram.sendMessage(ctx.message.chat.id, text, dashboard)
  } else {
  ctx.reply('Hello')
  }
})

const { enter, leave } = Stage

const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const stage = new Stage([echoScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())

bot.launch()
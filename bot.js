const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')

const { enter, leave } = Stage

const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('Режим: Echo',
    Markup.inlineKeyboard([
    Markup.callbackButton('Покинуть режим', 'leaveEcho'),
    ]).extra()
))
echoScene.action('enterEcho', leave())
echoScene.leave((ctx) => ctx.reply('Покидаем режим: Echo'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([echoScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah') {
  return ctx.reply('Добро пожаловать!',
    Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
    ]).extra()
  )
  } else {
  ctx.reply('Hello')
  }
})

bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
bot.launch()
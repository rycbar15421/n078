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
echoScene.action('leaveEcho', leave())
echoScene.leave((ctx) => ctx.reply('Покидаем режим: Echo'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const debugScene = new Scene('debug')
debugScene.enter((ctx) => ctx.reply('Режим: Debug',
    Markup.inlineKeyboard([
    Markup.callbackButton('Покинуть режим', 'leaveDebug'),
    ]).extra()
))
debugScene.action('leaveDebug', leave())
debugScene.leave((ctx) => ctx.reply('Покидаем режим: Debug'))
debugScene.on('message', (ctx) => ctx.telegram.sendMessage(ctx.chat.id, debug(ctx.message)))

function debug(obj = {}) {
  return JSON.stringify(obj, null, 4)
}

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([echoScene, debugScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah') {
  return ctx.reply('Добро пожаловать!',
    Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
      Markup.callbackButton('Режим: Debug', 'enterDebug')
    ]).extra()
  )
  } else {
  ctx.reply('Hello')
  }
})
bot.action('enterDebug', (ctx) => ctx.scene.enter('debug'))
bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
bot.launch()
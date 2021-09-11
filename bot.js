const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { debug, gameShortName, gameUrl, markup, welcome, support } = require('./data.js')

const { enter, leave } = Stage

const leaveKeyboard = Markup.keyboard(['Покинуть режим']).oneTime().resize().extra()

const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('Запускаю режим: Echo', leaveKeyboard))
echoScene.hears('Покинуть режим', leave())
echoScene.leave((ctx) => ctx.reply('Покидаем режим: Echo'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const debugScene = new Scene('debug')
debugScene.enter((ctx) => ctx.reply('Запускаю режим: Debug', leaveKeyboard))
debugScene.hears('Покинуть режим', leave())
debugScene.leave((ctx) => ctx.reply('Покидаем режим: Debug'))
debugScene.on('message', (ctx) => ctx.telegram.sendMessage(ctx.chat.id, debug(ctx.message)))

const stage = new Stage([echoScene, debugScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {welcome(ctx)})
bot.command('game', ({ replyWithGame }) => replyWithGame(gameShortName, markup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl))
bot.on('text', (ctx) => {support(ctx)})
bot.action('enterDebug', (ctx) => ctx.scene.enter('debug'))
bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
bot.launch()
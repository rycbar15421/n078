const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { debug, welcome, support, me, echo } = require('./data.js')
const bot = new Telegraf(process.env.BOT_TOKEN)

const gameShortName = 'dice'
const gameUrl = 'https://rycbar15421.github.io/dice/'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Играть сейчас!'),
    Markup.urlButton('Поделиться игрой', 'https://telegram.me/n078bot?game=dice')
  ])
)

bot.command('game', ({ replyWithGame }) => replyWithGame(gameShortName, markup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl))


const mathGameShortName = 'math'
const mathGameUrl = 'https://rycbar15421.github.io/game_math/'

const mathMarkup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Играть сейчас!'),
    Markup.urlButton('Поделиться игрой', 'https://telegram.me/n078bot?game=math')
  ])
)

bot.command('math', (ctx) => ctx.replyWithGame(mathGameShortName, mathMarkup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(mathGameUrl))

const { enter, leave } = Stage

const leaveKeyboard = Markup.keyboard(['Покинуть режим']).oneTime().resize().extra()

const echoScene = new Scene('echo')
echoScene.enter((ctx) => {ctx.replyWithMarkdown(`Запускаю режим: Echo`, leaveKeyboard)})
echoScene.hears('Покинуть режим', leave())
echoScene.leave(({ reply }) => reply('Покидаем режим: Echo'))
echoScene.on('message', (ctx) => echo(ctx))
//echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
//echoScene.on('message', ({ reply }) => reply('Принимаю только текстовые сообщения!'))

const debugScene = new Scene('debug')
debugScene.enter((ctx) => ctx.reply('Запускаю режим: Debug', leaveKeyboard))
debugScene.hears('Покинуть режим', leave())
debugScene.leave((ctx) => ctx.reply('Покидаем режим: Debug'))
debugScene.on('message', (ctx) => ctx.telegram.sendMessage(ctx.chat.id, debug(ctx.message)))

const stage = new Stage([echoScene, debugScene])
bot.use(session())
bot.use(stage.middleware())
bot.start((ctx) => {welcome(ctx)})
bot.hears(/\/me (.+)/, (ctx, match) => {me(ctx, match)})
bot.action('enterDebug', (ctx) => ctx.scene.enter('debug'))
bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
bot.on('text', (ctx) => {support(ctx)})
bot.launch()
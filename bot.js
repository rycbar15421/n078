const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')

const gameShortName = 'dice'
const gameUrl = 'https://rycbar15421.github.io/dice/'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Play now!'),
    Markup.urlButton('Share game', 'https://telegram.me/n078bot?game=dice')
  ])
)
bot.command('game', ({ replyWithGame }) => replyWithGame(gameShortName, markup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl))



const chatID = `-1001544484628`
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
  } else if (ctx.chat.type === 'private'){
    const welcome = `[${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) запустил бота`
    ctx.telegram.sendMessage(chatID, welcome, Extra.markdown())
  }
})
bot.on('text', (ctx) => {
  if (ctx.message.chat.type === 'private'){
    ctx.telegram.forwardMessage(chatID, ctx.chat.id, ctx.message.message_id)
  }
  else if ("reply_to_message" in ctx.message && "forward_from" in ctx.message.reply_to_message) {
    ctx.telegram.sendMessage(ctx.message.reply_to_message.forward_from.id, ctx.message.text)
  }
})
bot.action('enterDebug', (ctx) => ctx.scene.enter('debug'))
bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
bot.launch()
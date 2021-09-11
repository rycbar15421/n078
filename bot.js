const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { dashboard } = require('./functions.js')


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



const chatID = `-1001544484628`



const debugScene = new Scene('debug')
debugScene.enter((ctx) => ctx.reply('Запускаю режим: Debug', leaveKeyboard))
debugScene.hears('Покинуть режим', leave())
debugScene.leave((ctx) => ctx.reply('Покидаем режим: Debug'))
debugScene.on('message', (ctx) => ctx.telegram.sendMessage(ctx.chat.id, debug(ctx.message)))

function debug(obj = {}) {
  return JSON.stringify(obj, null, 4)
}

const stage = new Stage([echoScene, debugScene])
bot.use(session())
bot.use(stage.middleware())

const stage = new Stage([echoScene, debugScene])
const { enter, leave } = Stage
const echoScene = new Scene('echo')
echoScene.echo()

bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah' || ctx.startPayload === 'y') {
  return ctx.reply('Добро пожаловать!', dashboard())
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
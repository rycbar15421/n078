const { Scenes, session, Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const dashboard = Markup.inlineKeyboard([Markup.button.callback('Режим: Echo', 'echo')])
bot.action('echo', (ctx) => ctx.scene.enter('echo'))


bot.start((ctx) => {
  if (ctx.startPayload === 'yowzah') {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'Добро пожаловать!')
  } else {
  ctx.reply('Hello')
  }
})

const { enter, leave } = Scenes.Stage

const echoScene = new Scenes.BaseScene<Scenes.SceneContext>('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const stage = new Scenes.Stage<Scenes.SceneContext>([greeterScene, echoScene], {
  ttl: 10,
})
bot.use(session())
bot.use(stage.middleware())

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
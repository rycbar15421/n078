const { Scenes, session, Telegraf, Markup, Extra } = require('telegraf')
const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN)

const { debug, support, me, echo, rndDice } = require('./other.js')
const { CustomScenes, checkStatus } = require('./scenes.js')
const curScene = new CustomScenes()
// const adminScene = curScene.adminScene()
// const userScene = curScene.userScene()
const welcomeScene = curScene.welcomeScene()
const stage = new Scenes.Stage<Scenes.SceneContext>([adminScene, userScene])
const { enter, leave } = Scenes.Stage

bot.use(session())
bot.use(stage.middleware())
bot.start((ctx) => {
    if (ctx.message.chat.type === 'private') {
        ctx.scene.enter('welcomeScene')
    }
});
bot.command('dice', (ctx) => rndDice(ctx))

const leaveKeyboard = Markup.keyboard(['Покинуть режим']).oneTime().resize().extra()
/*
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
*/
bot.use(session())
bot.use(stage.middleware())
bot.hears(/\/me (.+)/, (ctx, match) => {me(ctx, match)})
/*
bot.action('enterDebug', (ctx) => ctx.scene.enter('debug'))
bot.action('enterEcho', (ctx) => ctx.scene.enter('echo'))
*/
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
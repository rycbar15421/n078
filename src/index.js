const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const { devFunc, dice, regFunc } = require('./helpers')
const bot = new Telegraf('1962085701:AAGcKHT9CBw9LnAXkEtuteY3yxpTtR0v9A8')

const CustomScenes = require('./customScenes')
const curScene = new CustomScenes()
const sampleScene = curScene.SampleScene()
const adminScene = curScene.AdminScene()
const playerScene = curScene.PlayerScene()

const stage = new Stage([adminScene, sampleScene, playerScene])

bot.use(session())
bot.use(stage.middleware())

bot.command('group', (ctx) => {
  ctx.telegram.sendMessage('-1001540718998', 'Список Участников:',
  	{reply_markup: { inline_keyboard: [[{ text: 'Зарегестрироваться', callback_data: 'registration' },]]}})
})
bot.command('dice', (ctx) => dice(ctx))
bot.command('dev', (ctx) => devFunc(ctx))
bot.action('registration', (ctx) => regFunc(ctx))
bot.action(/.+/, async ({answerCbQuery}) => await answerCbQuery())
bot.launch()
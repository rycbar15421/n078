const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const { enterScene } = require('./helpers')
const bot = new Telegraf(process.env.BOT_TOKEN||'1962085701:AAGcKHT9CBw9LnAXkEtuteY3yxpTtR0v9A8')

const CustomScenes = require('./customScenes')
const curScene = new CustomScenes()
const sampleScene = curScene.SampleScene()
const userScene = curScene.UserCustomScene()
const adminScene = curScene.AdminCustomScene()
const groupScene = curScene.GroupCustomScene()

const stage = new Stage([userScene, adminScene, groupScene, sampleScene])

bot.use(session())
bot.use(stage.middleware())
bot.action(/.+/, async ({answerCbQuery}) => await answerCbQuery('🤷🏻‍♂️'))
bot.on('message', (ctx) => enterScene(ctx))
bot.launch()
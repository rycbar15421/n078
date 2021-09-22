const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const { dev, dice } = require('./helpers')
const bot = new Telegraf(process.env.BOT_TOKEN)

const CustomScenes = require('./customScenes')
const curScene = new CustomScenes()
const sampleScene = curScene.SampleScene()
const adminScene = curScene.AdminCustomScene()

const stage = new Stage([adminScene, sampleScene])

bot.use(session())
bot.use(stage.middleware())
bot.command('id', (ctx) => ctx.reply(ctx.message.from.id))
bot.command('dice', (ctx) => dice(ctx))
bot.command('dev', (ctx) => dev(ctx))
bot.action(/.+/, async ({answerCbQuery}) => await answerCbQuery('🤷🏻‍♂️'))
bot.launch()
const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const Scene = require('telegraf/scenes/base')
const { dice, dev, deeplink } = require('./helpers')
const { dashboardKeyboard, scenesKeyboard, onOffkeyboard } = require('./keyboard')

class CustomScenes {
	SampleScene() {
		const sample = new Scene('sample')
		sample.enter(async (ctx) => await ctx.reply('Добро пожаловать в сцену: sample'))
		sample.hears('hears', async (ctx) => await ctx.reply('hears'))
		sample.action(/.+/, async (ctx) => await ctx.answerCbQuery('action', true))
		sample.on('text', async (ctx) => await ctx.copyMessage(ctx.message.from.id))
		return sample
	}

	AdminCustomScene () {
		const admin = new Scene('admin')
		admin.enter(async ({reply}) => {await reply('Настройки', dashboardKeyboard())})
		admin.start((ctx) => deeplink(ctx))
		admin.action(/.+/, async (ctx) => {await ctx.answerCbQuery(`${ctx.match[0]}`)})
		return admin
	}
}


module.exports = CustomScenes
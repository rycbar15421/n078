const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const Scene = require('telegraf/scenes/base')
const { dice, me, dev, enterScene, devList, list } = require('./helpers')
const { dashboardKeyboard, scenesKeyboard, onOffkeyboard } = require('./keyboard')

const { enter, leave } = Stage

class CustomScenes {
	SampleScene() {
		const sample = new Scene('sample')
		sample.enter(async (ctx) => await ctx.reply('Добро пожаловать в сцену: sample'))
		sample.hears('hears', async (ctx) => await ctx.reply('hears'))
		sample.action(/.+/, async (ctx) => await ctx.answerCbQuery('action', true))
		sample.on('text', async (ctx) => await ctx.copyMessage(ctx.message.from.id))
		return sample
	}

	GroupCustomScene() {
		const group = new Scene('group')
		group.command('dice', async (ctx) => await dice(ctx))
		group.hears(/\/me (.+)/, (ctx, match) => me(ctx, match))
		group.action(/.+/, async ({answerCbQuery}) => await answerCbQuery('Хм...'))
		return group
	}

	UserCustomScene () {
		const user = new Scene('user')
//		user.enter(async (ctx) => await ctx.copyMessage(ctx.message.from.id))
		user.command('dice', async (ctx) => await dice(ctx))
		user.command('dev', async (ctx) => await dev(ctx))
		user.on('message', async (ctx) => await ctx.copyMessage(ctx.message.from.id))
		user.action(/.+/, async ({answerCbQuery}) => await answerCbQuery('Хм...'))
		return user
	}

	SupportCustomScene () {
		const support = new Scene('support')
		// support.command('scene', ({reply}) => reply('Ты в support-сцене'))
		// support.enter(async ({reply}) => await reply('Здравствуй! Напиши свой вопрос, отвечу как смогу.'))
		// support.on('text', async (ctx) => {
		// await	ctx.reply('Ваш запрос принят. Ожидайте ответа')
		// await	ctx.forwardMessage(devList[0])
		// })
		// support.on('message', async ({reply}) => await reply('Я принимаю только текстовые сообщения.'))
		return support
	}

	AdminCustomScene () {
		const admin = new Scene('admin')
		admin.enter(async ({reply}) => {await reply('Настройки', dashboardKeyboard())})
		admin.hears(/\/list (add) ([0-9]+)|\/list (del)|\/(list)/, (ctx, match) => list(ctx, match))
		admin.action('sceneHome', async (ctx) => {
		  await ctx.answerCbQuery()
		  await ctx.editMessageText('Настройки сцен', scenesKeyboard())
		})
		admin.action(/.+/, async ({answerCbQuery}) => {await answerCbQuery(`Хм...`)})
		return admin
	}
}


module.exports = CustomScenes
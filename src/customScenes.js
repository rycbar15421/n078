const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const Scene = require('telegraf/scenes/base')
const { killPlayer, checkAction, playerListKeyboard, reset } = require('./helpers')
const { dashboardKeyboard, scenesKeyboard } = require('./keyboard')

const { leave } = Stage

class CustomScenes {
	SampleScene() {
		const sample = new Scene('sample')
		sample.enter(async (ctx) => await ctx.reply('Добро пожаловать в сцену: sample'))
		sample.hears('hears', async (ctx) => await ctx.reply('hears'))
		sample.action(/.+/, async (ctx) => await ctx.answerCbQuery('action', true))
		sample.on('text', async (ctx) => await ctx.copyMessage(ctx.message.from.id))
		return sample
	}

	AdminScene () {
		const admin = new Scene('admin')
		admin.enter(async ({reply}) => {await reply('Настройки', dashboardKeyboard())})
		admin.start(async (ctx) => await deeplink(ctx))
		admin.action('playerList', async (ctx) => await ctx.editMessageText('Участники', playerListKeyboard()))
		admin.action('back', async (ctx) => await ctx.editMessageText('Настройки', dashboardKeyboard()))
		admin.action('reset', async (ctx) => await reset(ctx))
		admin.action(/player_[0-9]/, async (ctx) => await killPlayer(ctx))
		admin.action(/.+/, async (ctx) => {await ctx.answerCbQuery(`${ctx.match[0]}`)})
		return admin
	}

	PlayerScene() {
		const player = new Scene('player')
		player.on('message', (ctx) => console.log('player.message'))
		player.action('registration', async (ctx) => {
			if (checkAction(ctx)) {
				await ctx.answerCbQuery('Вы уже находитесь в игре, ожидайте завершения', true)	
			} else { ctx.scene.reenter }
		})
		player.action(/.+/, async (ctx) => await ctx.answerCbQuery())
		return player
	}
}


module.exports = CustomScenes
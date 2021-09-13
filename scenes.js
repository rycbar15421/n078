const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')

let config = {
    "admin": 1431888270,
    "admin_chat": -1001544484628
}

function dashboard() {
    return Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
      Markup.callbackButton('Режим: Debug', 'enterDebug')
    ]).extra()	
}

class CustomScenes {
	welcomeScene () {
		const welcomeScene = new Scene('welcomeScene')
		let isAdmin = (userId) => {return userId == config.admin};
		ctx.reply(isAdmin(ctx.message.from.id)
			? ctx.scene.enter('adminScene')
			: ctx.scene.enter('userScene'))
	}
	userScene () {
		const userScene = new Scene('userScene')
		userScene.enter((ctx) => {
		    const welcome = `[${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) запустил бота`
		    ctx.telegram.sendMessage(config.admin_chat, welcome, Extra.markdown())
		    ctx.reply('Ну привет. Рассказывай, что случилось?')
		})
		userScene.on('text', (ctx) => {
			ctx.telegram.forwardMessage(config.admin_chat, ctx.chat.id, ctx.message.message_id)
		})
	}
	adminScene () {
		const adminScene = new Scene('adminScene')
		adminScene.enter((ctx) => {
			ctx.reply('Добро пожаловать!', dashboard())
		})
	}
}

module.exports = { CustomScenes, checkStatus }
const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')

let config = {
    "admin": 1431888270,
    "admin_chat": -1001544484628
}

let isAdmin = (userId) => {return userId == config.admin};


function dashboard() {
    return Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
      Markup.callbackButton('Режим: Debug', 'enterDebug')
    ]).extra()	
}

class Scenes {
	userScene () {
		const userScene = new Scene('user')
		userScene.enter((ctx) => {
		    const welcome = `[${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) запустил бота`
		    ctx.telegram.sendMessage(config.admin_chat, welcome, Extra.markdown())
		})
		userScene.on('text', (ctx) => {
			ctx.telegram.forwardMessage(config.admin_chat, ctx.chat.id, ctx.message.message_id)
		})
	}
	adminScene () {
		const adminScene = new Scene('admin')
		adminScene.enter((ctx) => {
			ctx.reply('Добро пожаловать!', dashboard())
		})
	}
}

module.exports = Scenes
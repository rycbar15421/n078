const { Extra, Markup } = require('telegraf')


function dashboardKeyboard() {
  return Markup
  .inlineKeyboard([
  	[ Markup.callbackButton('Сцены', 'sceneHome')],
  ]).extra()  
}

function scenesKeyboard() {
	return Markup.inlineKeyboard([
		[Markup.callbackButton('Текущая сцена', 'curScene')],
		[Markup.callbackButton('user[]', 'userScene'), Markup.callbackButton('admin[]', 'adminScene')],
		[Markup.callbackButton('publicChat[]', 'publicChatScene')],
    [Markup.callbackButton('support[]', 'supportScene')]
		]).extra()
}


function onOffkeyboard() {
  return Markup.inlineKeyboard([
  	[Markup.callbackButton('On', 'on'), Markup.callbackButton('Off', 'off')], 
    [Markup.callbackButton('Назад', 'sceneHome')]
  ]).extra()  
}

module.exports = { dashboardKeyboard, scenesKeyboard, onOffkeyboard }
const { Extra, Markup } = require('telegraf')
const { playerListSettings } = require('./helpers')

let dashboard = [
{text: 'Список игроков', callback_data: 'playerList'},
{text: 'Список', callback_data: 'list'}
]

function dashboardKeyboard() {
  return Markup
  .inlineKeyboard(dashboard, { columns: 2 }).extra()  
}

function scenesKeyboard() {
	return Markup.inlineKeyboard([
		[Markup.callbackButton('Текущая сцена', 'curScene')],
		[Markup.callbackButton('user[]', 'userScene'), Markup.callbackButton('admin[]', 'adminScene')],
		[Markup.callbackButton('publicChat[]', 'publicChatScene')],
    [Markup.callbackButton('support[]', 'supportScene')]
		]).extra()
}

module.exports = { dashboardKeyboard, scenesKeyboard }
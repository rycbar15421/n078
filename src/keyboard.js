const { Extra, Markup } = require('telegraf')


function dashboardKeyboard() {
  return Markup
  .inlineKeyboard([
  	[ Markup.callbackButton('Сцены', 'sceneHome')],
  ]).extra()  
}

module.exports = { dashboardKeyboard, scenesKeyboard, onOffkeyboard }
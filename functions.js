const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')

function dashboard() {
    return Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
      Markup.callbackButton('Режим: Debug', 'enterDebug')
    ]).extra()	
}

const leaveKeyboard = Markup.keyboard(['Покинуть режим']).resize().extra()

const stage = new Stage([echoScene, debugScene])
const { enter, leave } = Stage

function echo() {
echoScene.enter((ctx) => ctx.reply('Запускаю режим: Echo', leaveKeyboard))
echoScene.hears('Покинуть режим', leave())
echoScene.leave((ctx) => ctx.reply('Покидаем режим: Echo'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))	
}


module.exports = { dashboard, echo } 
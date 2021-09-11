const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegraf = require('telegraf')
const chatID = `-1001544484628`

let support = (ctx) => {
  if (ctx.message.chat.type === 'private'){
    ctx.telegram.forwardMessage(chatID, ctx.chat.id, ctx.message.message_id)
  }
  else if ("forward_from" in ctx.message.reply_to_message && ctx.message.reply_to_message.from.username === 'n078bot') {
    ctx.telegram.sendMessage(ctx.message.reply_to_message.forward_from.id, ctx.message.text)
  }
}

let me = (ctx, match) => {
  if ("reply_to_message" in ctx.message) {
    ctx.deleteMessage(ctx.message.message_id)
    ctx.replyWithMarkdown(`👻 [${ctx.message.reply_to_message.from.first_name}](tg://user?id=${ctx.message.reply_to_message.from.id}) ${ctx.match[1]}`)
  } else if (true) {
    ctx.deleteMessage(ctx.message.message_id)
    ctx.replyWithMarkdown(`👾 [${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) ${ctx.match[1]}`)
  }
}

function dashboard() {
    return Markup.inlineKeyboard([
      Markup.callbackButton('Режим: Echo', 'enterEcho'),
      Markup.callbackButton('Режим: Debug', 'enterDebug')
    ]).extra()	
}

let welcome = (ctx) => {
  if (ctx.startPayload === 'yowzah' || ctx.startPayload === 'y') {
  return ctx.reply('Добро пожаловать!', dashboard())
  } else if (ctx.chat.type === 'private'){
    const welcome = `[${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) запустил бота`
    ctx.telegram.sendMessage(chatID, welcome, Extra.markdown())
  }  
}

let echo = (ctx) => {
  if ("text" in ctx.message || "sticker" in ctx.message || "dice" in ctx.message) {
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
  }
}

function debug(obj = {}) {
  return JSON.stringify(obj, null, 4)
}


module.exports = { debug, welcome, support, me, echo } 
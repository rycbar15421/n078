const { debounce, throttle } = require('throttle-debounce')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const { dicesId } = require('./text.js')

var devList = [{"text": "1431888270", "callback_data": "1431888270",}]

function dev(ctx) {
  try {
    if (devList.find(item => item.text == `${ctx.message.from.id}`)) {
      ctx.scene.enter('admin')
    } else {
      ctx.scene.reenter
    }
  } catch(err) { console.log(err) }
}

/*
function me(ctx, match) {
  try {
    if ("reply_to_message" in ctx.message) {
      ctx.deleteMessage(ctx.message.message_id)
      ctx.replyWithMarkdown(`👻 [${ctx.message.reply_to_message.from.first_name}](tg://user?id=${ctx.message.reply_to_message.from.id}) ${ctx.match[1]}`)
    } else {
      ctx.deleteMessage(ctx.message.message_id)
      ctx.replyWithMarkdown(`👾 [${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}) ${ctx.match[1]}`)
    }
  } catch(err) { console.log(err) }
}
*/

function getRandom(min, max) {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dice = throttle(3000, (ctx) => {
  try {
    let diceValue = getRandom()
    let diceValuePlus1 = diceValue + 1
    let diceValueMsg = `${ctx.message.from.first_name}: ${diceValuePlus1}`
    ctx.replyWithSticker(dicesId[diceValue], { reply_to_message_id: ctx.message.message_id })
    ctx.telegram.sendMessage('-1001544484628', diceValueMsg)
  } catch(err) { console.log(err) }
})

function isNumber( str ) {
 return /[0-9]+/.test(str);
}

function deeplink(ctx) {
  try {
    if (isNumber(ctx.startPayload)) {
      console.log('++')
      devList.push({
          "text": ctx.startPayload,
          "callback_data": ctx.startPayload
        })
    } else {
      switch (ctx.startPayload) {
        case 'list':
        ctx.reply(devList)
        break
        case 'del':
        devList.pop()
        break
        default:
        console.log(ctx.startPayload)
        ctx.reply('чтож...')
        break
      }
    }
  } catch(err) { console.log(err) }
}


module.exports = { dice, dev, deeplink }
const { debounce, throttle } = require('throttle-debounce')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const { dicesId } = require('./text.js')

let devList = ['1431888270']

function list(ctx, match) {
  try {
    switch (ctx.match[1]||ctx.match[3]||ctx.match[4]) {
      case 'add':
      ctx.reply('Пользователь добавлен')
      devList.push(`${ctx.match[2]}`)
        break
      case 'del':
      ctx.reply('Пользователь удален')
      devList.pop()
        break
      case 'list':
      ctx.reply(devList)
      break
      default:
      break
    }
  } catch(err) { console.log(err) }
}

function dev(ctx) {
  try {
    if (devList.includes(`${ctx.message.from.id}`)) {
      ctx.scene.enter('admin')
    } else {
      ctx.scene.reenter
      access(ctx)
    }
  } catch(err) { console.log(err) }
}

const access = debounce(5000, (ctx) => {
  try {
    let text = `[${ctx.message.from.id}](tg://user?id=${ctx.message.from.id}) запрашивает доступ`
    ctx.telegram.sendMessage('-1001544484628', text, {parse_mode: 'Markdown'})
  } catch(err) { console.log(err) }
})

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


function getRandom(min, max) {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dice = throttle(2000, (ctx) => {
  try {
    let diceValue = getRandom()
    let diceValuePlus1 = diceValue + 1
    let diceValueMsg = `${ctx.message.from.first_name}: ${diceValuePlus1}`
    ctx.replyWithSticker(dicesId[diceValue], { reply_to_message_id: ctx.message.message_id })
    ctx.telegram.sendMessage('-1001544484628', diceValueMsg)
  } catch(err) { console.log(err) }
})

function enterScene(ctx) {
    try {
        switch (ctx.message.chat.type) {
            case 'private':
            ctx.scene.enter('user')
            break
            case 'supergroup':
            ctx.scene.enter('group')
            break
            default:
            ctx.scene.reenter
            break
        }
    } catch(err) { console.log(err) }
}


module.exports = { dice, me, dev, enterScene, list }
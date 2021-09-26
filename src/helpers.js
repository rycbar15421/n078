const { debounce, throttle } = require('throttle-debounce')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const { dicesId } = require('./text.js')

/*
if (checkAction(ctx)) {
  function()
} else { ctx.scene.reenter }
*/

let playerList = ["[D&D Мастер](tg://user?id=1431888270)",]
let playerListSettings = [{text: 'Сбросить', callback_data: 'reset'}, {text: 'Назад', callback_data: 'back'}]
let devList = ['1431888270']
let spectatorList = []
let playerListId = []
let deadList = []

function isNumber( str ) {
 return /[0-9]+/.test(str);
}

function playerListKeyboard() {
  return Markup.inlineKeyboard(playerListSettings, { columns: 2 }).extra()
}

// Сбросить ---------------------------------------
function reset(ctx) {
  ctx.answerCbQuery()
  playerList = ["[D&D Мастер](tg://user?id=1431888270)",]
  playerListSettings = [{text: 'Сбросить', callback_data: 'reset'}, {text: 'Назад', callback_data: 'back'}]
  playerListId = []
  deadList = []
  spectatorList = []
}
// Сбросить ---------------------------------------

// Убить игрока -----------------------------------
function killPlayer(ctx) {
  try {
    ctx.answerCbQuery()
    const reqId = ctx.update.callback_query.data
    const found = playerListSettings.find(entry => entry.callback_data == reqId);
    if (found.done == 'true') {
      found.done = 'false'
      const off = '❌ '
      let result = off.concat(found.text)
      found.text = result
      ctx.editMessageText('Участники', playerListKeyboard())
    }

    const requiredId = ctx.update.callback_query.data.match(/_[0-9]*/)[0].substr(1)
    deadList.push(requiredId)
    const index = playerListId.indexOf(requiredId);
    if (index > -1) {
      playerListId.splice(index, 1);
    }
  } catch(err) { console.log(err) }
}

// Убить игрока -----------------------------------

// Проверка состояния --------------------------------------------
function checkAction(ctx) {
  if (spectatorList.includes(`${ctx.update.callback_query.from.id}`)) {
    ctx.answerCbQuery("Вы только наблюдаете", true)
    return false
  } else if (deadList.includes(`${ctx.update.callback_query.from.id}`)) {
    ctx.answerCbQuery("Вас убили или посадили!", true)
    return false
  } else { return true }
}
// Проверка состояния --------------------------------------------

// Регистрация в игру --------------------------------------------
function regFunc(ctx) {
  try {
    ctx.answerCbQuery('Присоединились к игре', true)
    let name = ctx.update.callback_query.from.first_name
    let id = ctx.update.callback_query.from.id
    playerList.push(`[${name}](tg://user?id=${id})`)
    playerListId.push(id)
    playerListSettings.unshift({
      text: `${name}`,
      callback_data: `player_${id}`,
      done: 'true'
    })
    ctx.editMessageText(playerListFunc(), Extra.markdown().markup(
    Markup.inlineKeyboard([
      Markup.callbackButton('Зарегестрироваться', 'registration')
    ])))
    if (playerListId.includes(ctx.update.callback_query.from.id)) {
      ctx.scene.enter('player')
    } else { ctx.scene.reenter }
  } catch(err) { console.log(err) }
}

function playerListFunc() {
  try {
    let str = '';
    let msg = 'Список Участников:\n'
    for (let i = 0; i < playerList.length; i++) {
      str += i + ') ' + playerList[i] + '\n'
    }
    let result = msg.concat(str)
    return result
  } catch(err) { console.log(err) }
}
// Регистрация в игру --------------------------------------------

// Добавление в наблюдателей -------------------------------------
function deeplinkFunc(ctx) {
  try {
    if (isNumber(ctx.startPayload)) {
      ctx.reply('Пользователь добавлен')
      spectatorList.push(ctx.startPayload)
    } else {
      switch (ctx.startPayload) {
        case 'del':
        spectatorList.pop()
        ctx.reply('Пользователь удален')
        break
        default:
        ctx.reply(spectatorList)
        break
      }
    }
  } catch(err) { console.log(err) }
}
// Добавление в наблюдателей -------------------------------------

// Режим админа --------------------------------------------------
function devFunc(ctx) {
  try {
    if (devList.includes(`${ctx.message.from.id}`)) {
      ctx.scene.enter('admin')
    } else {
      ctx.scene.reenter
    }
  } catch(err) { console.log(err) }
}
// Режим админа --------------------------------------------------

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

// Кубик -----------------------------------
const dice = throttle(3000, (ctx) => {
  try {
    let diceValue = getRandom()
    let diceValuePlus1 = diceValue + 1
    let diceValueMsg = `${ctx.message.from.first_name}: ${diceValuePlus1}`
    ctx.replyWithSticker(dicesId[diceValue], { reply_to_message_id: ctx.message.message_id })
    ctx.telegram.sendMessage('-1001544484628', diceValueMsg)
  } catch(err) { console.log(err) }
})

function getRandom(min, max) {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Кубик -----------------------------------

module.exports = { dice, regFunc, devFunc, deeplinkFunc, playerListSettings, killPlayer, checkAction, playerListKeyboard, reset }
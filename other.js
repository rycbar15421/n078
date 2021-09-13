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

let echo = (ctx) => {
  if ("text" in ctx.message || "sticker" in ctx.message || "dice" in ctx.message) {
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
  }
}

function debug(obj = {}) {
  return JSON.stringify(obj, null, 4)
}

let dices = [
  "CAACAgIAAx0CXA73FAACAwFhPxPlnm3mjc9azLYWLwL048OM2QACRxAAAlk7-Un7CptapA5PhiAE",
  "CAACAgIAAx0CXA73FAACAwNhPxSrWLdVY8lqsgExGgLsHVP8_wAC2A8AAp0P-Um4786lEDUhoCAE",
  "CAACAgIAAx0CXA73FAACAwVhPxS0hiCtE1C7SVwNbTXZYgc3-QACjQ4AAnGpAAFKx4LcEvPSRKkgBA",
  "CAACAgIAAx0CXA73FAACAwdhPxTpKPShAyBozUPK6gOHYQTa2gAC_Q4AApT5-Em7DepKSh3LXyAE",
  "CAACAgIAAx0CXA73FAACAwlhPxTyah8vlki81DOrHifj3cvzkQACMBAAAjbr-EkjrkeFD_CNKSAE",
  "CAACAgIAAx0CXA73FAACAwthPxT5z7vuZkKtWXZkuc3POgABiukAAh0RAAJcWflJefzABQexvl0gBA",
  "CAACAgIAAx0CXA73FAACAw1hPxUAAeg0LK5SF6DcZsbT8AgBE84AAsIQAAL7J_lJhFEim2MhRkAgBA",
  "CAACAgIAAx0CXA73FAACAw9hPxUOVuHXsZNU1Gqg1ol_xfmDmgACThAAAp_N-EnZXsiGFqXN6CAE",
  "CAACAgIAAx0CXA73FAACAxFhPxUVSE7w-Ss4Cl9wODF3Xh6O-wACtA0AAh1d-EnswsbQdSEDwCAE",
  "CAACAgIAAx0CXA73FAACAxNhPxUeBo6c_E7pq8Oo0uY_hpgU-wACvRQAAlmyAAFKiXQQy3XrROAgBA",
  "CAACAgIAAx0CXA73FAACAxVhPxUngVV4v7MUNPhGID61xLQigAACRw4AAiVE-EnIXy6vSCtFLSAE",
  "CAACAgIAAx0CXA73FAACAxdhPxUuy9mLmak3mzamnwFzCLanlwACAw8AAkwy-UnX617C7-iIniAE",
  "CAACAgIAAx0CXA73FAACAxlhPxU2Hv74muzyt9pPxF5r-OWIvQACCA8AAryq-UlD-6JnkhyeCSAE",
  "CAACAgIAAx0CXA73FAACAxthPxU9rJGmjZQTcItqg2PL7vPCKwACLxIAAujn-EkR1RarBh1acCAE",
  "CAACAgIAAx0CXA73FAACAx1hPxVDbgqQ_PNsa0B-r4LygosU7wACAg8AAlUu-El9Aq4PoTf13SAE",
  "CAACAgIAAx0CXA73FAACAx9hPxVKEpfwCe28GaRECTL7vWb85QACnhMAAqR_AAFKiKHoE4h2-akgBA",
  "CAACAgIAAx0CXA73FAACAyFhPxVRB8YN-n9cfGa6EbAQNujtjgACLA0AAhEY-Um0JcKlRfOrLSAE",
  "CAACAgIAAx0CXA73FAACAyNhPxVbhg2y3uluBn0XTcLQmXocvgACLhMAAqk2-Umv_3WD4U6OtyAE",
  "CAACAgIAAx0CXA73FAACAyVhPxVhQ4IRWHYOYan8YOhplgQmsAACgQ0AAhTA-Umcf3_Y1lqA7iAE",
  "CAACAgIAAx0CXA73FAACAydhPxVnscGIqZO0566fuAIFXJHMcAACzw4AAsrH-UkpXQ82oYwxayAE"
]

function getRandom(min, max) {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let rndDice = (ctx) => {
  ctx.replyWithSticker(dices[getRandom()])
}

module.exports = { debug, welcome, support, me, echo, rndDice } 
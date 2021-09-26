const Telegraf = require('telegraf')
const bot = new Telegraf('1962085701:AAGcKHT9CBw9LnAXkEtuteY3yxpTtR0v9A8')
bot.use((ctx) => console.log('Перезагрузка бота...'))
function debug(obj = {}) { return JSON.stringify(obj, null, 4) }
bot.launch()
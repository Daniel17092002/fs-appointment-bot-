// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Substitua com seu token
const token = '7333947350:AAHYo81kAXQH_2xvRrvsSs2aDWcdzUHTq-0';
const bot = new TelegramBot(token, { polling: true });

// ID do seu Telegram
const chatId = 8031241808;

module.exports = function () {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(chatId, '👋 Bot VFS iniciado! Vou avisar quando surgir vaga e tentar agendar automaticamente.');
  });

  // Você pode adicionar mais comandos aqui se quiser no futuro
};

module.exports.botInstance = bot;
module.exports.chatId = chatId;

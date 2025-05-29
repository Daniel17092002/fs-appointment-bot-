// index.js
const bot = require('./bot');
const vfsChecker = require('./vfsChecker');
const schedule = require('node-cron');

// Inicia o bot do Telegram
bot();

// Agenda o monitoramento a cada 2 minutos
schedule.schedule('*/2 * * * *', () => {
  vfsChecker();
})

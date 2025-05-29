// vfsChecker.js
const puppeteer = require('puppeteer');
const { botInstance, chatId } = require('./bot');

async function vfsChecker() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://visa.vfsglobal.com/ago/pt/prt/login', {
      waitUntil: 'networkidle2',
    });

    console.log('🔐 Acessando página de login da VFS...');

    // ⚠️ AQUI você vai preencher com suas credenciais depois no Railway
    const email = process.env.VFS_EMAIL;
    const password = process.env.VFS_PASSWORD;

    await page.type('#mat-input-0', email, { delay: 50 });
    await page.type('#mat-input-1', password, { delay: 50 });
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('✅ Login feito com sucesso');

    // Vai até a página de agendamento
    await page.goto('https://visa.vfsglobal.com/ago/pt/prt/book-appointment', {
      waitUntil: 'networkidle2',
    });

    // Aqui você pode colocar verificações da disponibilidade
    const content = await page.content();
    if (content.includes('No appointment slots')) {
      console.log('❌ Nenhuma vaga disponível');
    } else {
      console.log('✅ POSSÍVEL VAGA ENCONTRADA!');
      botInstance.sendMessage(chatId, '🚨 POSSÍVEL VAGA ENCONTRADA! Vá correndo agendar!');
    }
  } catch (err) {
    console.error('Erro ao verificar vagas:', err);
    botInstance.sendMessage(chatId, '⚠️ Ocorreu um erro ao verificar as vagas.');
  } finally {
    await browser.close();
  }
}

module.exports = vfsChecker;

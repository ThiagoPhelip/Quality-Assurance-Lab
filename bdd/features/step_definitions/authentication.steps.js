const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const baseUrl = process.env.BASE_URL || 'https://automationpratice.com.br';
setDefaultTimeout(30_000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
});

After(async function () { await this.browser?.close(); });

Given('que acesso a página inicial', async function () { await this.page.goto(baseUrl, { waitUntil: 'networkidle' }); });
When('navego para o login', async function () { await this.page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' }); });
Given('que estou na página de login', async function () { await this.page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' }); });
Then('devo visualizar o formulário de login', async function () {
  await this.page.locator('input[type="password"]').waitFor();
});
When('informo credenciais sintéticas', async function () {
  await this.page.locator('#user').fill('qa.invalido@example.com');
  await this.page.locator('#password').fill('SenhaInvalida123!');
  await this.page.locator('#btnLogin').click();
});
Then('devo acessar minha conta', async function () {
  await this.page.waitForTimeout(500);
  assert.match(this.page.url(), /\/my-account/);
});

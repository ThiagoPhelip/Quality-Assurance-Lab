const { Given, When, Then } = require('@cucumber/cucumber');

const baseUrl = process.env.BASE_URL || 'https://automationpratice.com.br';

Given('que acesso o carrinho', async function () {
  await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'domcontentloaded' });
});
Then('devo visualizar um produto e a opção de avançar ao checkout', async function () {
  await this.page.getByText('Fit-Flare Dress', { exact: true }).last().waitFor();
  await this.page.getByText(/proceed to checkout/i).waitFor();
});
Given('que acesso o checkout', async function () { await this.page.goto(`${baseUrl}/checkout-one`, { waitUntil: 'networkidle' }); });
Then('devo visualizar endereço e ação de finalizar pedido', async function () {
  await this.page.locator('#faddress').waitFor();
  await this.page.getByRole('button', { name: /place order/i }).waitFor();
});

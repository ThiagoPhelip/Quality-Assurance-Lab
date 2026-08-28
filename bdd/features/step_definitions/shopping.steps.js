const { Given, When, Then } = require('@cucumber/cucumber');

const baseUrl = process.env.BASE_URL || 'https://automationpratice.com.br';

Given('que acesso o catálogo', async function () { await this.page.goto(`${baseUrl}/shop`, { waitUntil: 'networkidle' }); });
When('adiciono o primeiro produto e abro o carrinho', async function () {
  await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'networkidle' });
  await this.page.getByRole('button', { name: /clear cart/i }).click();
  await this.page.goto(`${baseUrl}/shop`, { waitUntil: 'networkidle' });
  await this.page.locator('.add-to-cart').first().click();
  await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'networkidle' });
});
Then('devo visualizar o produto e a opção de avançar ao checkout', async function () {
  await this.page.getByText('Green Dress For Woman', { exact: true }).waitFor();
  await this.page.getByText(/proceed to checkout/i).waitFor();
});
Given('que acesso o checkout', async function () { await this.page.goto(`${baseUrl}/checkout-one`, { waitUntil: 'networkidle' }); });
Then('devo visualizar endereço e ação de finalizar pedido', async function () {
  await this.page.locator('#faddress').waitFor();
  await this.page.getByRole('button', { name: /place order/i }).waitFor();
});

Cypress.on('uncaught:exception', () => false);

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.visit('/shop');
  cy.get('a[href*="product-details"]').first().click();
  cy.contains(/add to cart/i).click();
});

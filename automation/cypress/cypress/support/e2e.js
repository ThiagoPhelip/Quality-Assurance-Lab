Cypress.Commands.add('addFirstProductToCart', () => {
  cy.visit('/product-details-one/1');
  cy.contains('a', /^add to cart$/i).should('be.visible').click();
});

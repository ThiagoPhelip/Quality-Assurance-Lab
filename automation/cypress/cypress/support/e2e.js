Cypress.Commands.add('addFirstProductToCart', () => {
  cy.visit('/cart');
  cy.contains('button', /clear cart/i).click();
  cy.visit('/shop');
  cy.contains('a', 'Green Dress For Woman').should('be.visible');
  cy.get('.add-to-cart').first().click();
});

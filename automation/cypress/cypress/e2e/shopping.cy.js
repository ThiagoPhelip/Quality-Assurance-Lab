describe('Carrinho e checkout', () => {
  it('adiciona produto do catálogo e abre o carrinho', () => {
    cy.addFirstProductToCart();
    cy.visit('/cart');
    cy.contains('Green Dress For Woman').should('be.visible');
    cy.contains('a', /proceed to checkout/i).should('have.attr', 'href', '/checkout-one');
  });

  it('exibe os dados essenciais do checkout', () => {
    cy.addFirstProductToCart();
    cy.visit('/cart');
    cy.contains('a', /proceed to checkout/i).click();
    cy.url().should('include', '/checkout-one');
    cy.get('#faddress').should('be.visible');
    cy.contains('button', /place order/i).should('be.visible');
  });
});

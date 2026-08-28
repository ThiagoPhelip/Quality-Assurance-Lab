describe('Carrinho e checkout', () => {
  it('adiciona produto do catálogo e abre o carrinho', () => {
    cy.visit('/shop');
    cy.get('.add-to-cart').first().click();
    cy.visit('/cart');
    cy.contains('Fit-Flare Dress').should('be.visible');
    cy.contains(/proceed to checkout/i).should('have.attr', 'href', '/checkout-one');
  });

  it('exibe os dados essenciais do checkout', () => {
    cy.visit('/checkout-one');
    cy.get('#faddress').should('be.visible');
    cy.contains('button', /place order/i).should('be.visible');
  });
});

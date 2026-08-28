describe('Carrinho e checkout', () => {
  it('exibe o carrinho pré-carregado e permite avançar', () => {
    cy.visit('/cart');
    cy.get('table').contains('Fit-Flare Dress').should('be.visible');
    cy.contains('a', /proceed to checkout/i).should('have.attr', 'href', '/checkout-one');
  });

  it('exibe os dados essenciais do checkout', () => {
    cy.visit('/cart');
    cy.contains('a', /proceed to checkout/i).click();
    cy.url().should('include', '/checkout-one');
    cy.get('#faddress').should('be.visible');
    cy.contains('button', /place order/i).should('be.visible');
  });
});

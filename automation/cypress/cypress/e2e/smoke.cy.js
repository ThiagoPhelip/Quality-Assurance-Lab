describe('QAZANDO Shop - smoke', () => {
  it('carrega a loja e exibe produtos', () => {
    cy.visit('/');
    cy.title().should('contain', 'QAZANDO');
    cy.get('body').should('contain.text', 'Shop');
    cy.get('a[href*="product-details"]').should('have.length.greaterThan', 0);
  });

  it('abre login e valida envio vazio', () => {
    cy.visit('/login');
    cy.get('#btnLogin').click();
    cy.contains('E-mail inválido.').should('be.visible');
  });

  it('exibe o carrinho pré-carregado', () => {
    cy.visit('/cart');
    cy.get('table').contains('Fit-Flare Dress').should('be.visible');
    cy.contains('a', /proceed to checkout/i).should('be.visible');
  });
});

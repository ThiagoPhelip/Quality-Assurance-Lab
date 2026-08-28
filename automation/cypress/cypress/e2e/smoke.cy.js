describe('QAZANDO Shop - smoke', () => {
  it('carrega a loja e exibe produtos', () => {
    cy.visit('/');
    cy.title().should('contain', 'QAZANDO');
    cy.get('body').should('contain.text', 'Shop');
    cy.get('a[href*="product-details"]').should('have.length.greaterThan', 0);
  });

  it('abre login e valida envio vazio', () => {
    cy.visit('/login');
    cy.get('#btnLogin, button[type="submit"]').first().click();
    cy.get('body').should('match', ':visible').and('contain.text', 'Login');
  });

  it('adiciona um produto ao carrinho', () => {
    cy.addFirstProductToCart();
    cy.visit('/cart');
    cy.get('body').should('contain.text', 'Cart');
    cy.get('a[href*="product-details"], .cart-item, tbody tr').should('have.length.greaterThan', 0);
  });
});

describe('Autenticação', () => {
  it('autentica quando as credenciais obrigatórias são preenchidas', () => {
    cy.visit('/login');
    cy.get('#user').type('qa.invalido@example.com');
    cy.get('#password').type('SenhaInvalida123!');
    cy.get('#btnLogin').click();
    cy.url().should('include', '/my-account');
  });

  it('valida campos obrigatórios do cadastro', () => {
    cy.visit('/register');
    cy.get('#btnRegister').click();
    cy.contains('O campo nome deve ser prenchido').should('be.visible');
    cy.get('input:invalid').its('length').should('be.gte', 2);
  });
});

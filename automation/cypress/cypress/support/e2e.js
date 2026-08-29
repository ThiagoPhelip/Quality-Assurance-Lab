Cypress.Commands.add("visitSite", (route = "/") => {
  return cy.env(["siteUrl"]).then(({ siteUrl }) => {
    const url = new URL(route, `${siteUrl}/`).toString();
    cy.visit(url);
  });
});

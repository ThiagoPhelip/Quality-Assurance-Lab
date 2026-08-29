const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  env: {
    siteUrl: process.env.BASE_URL || "https://automationpratice.com.br",
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    retries: { runMode: 2, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5000",
    specPattern: "e2e/*.cy.js",
    supportFile: false,
    pageLoadTimeout: 120000,
  },
});

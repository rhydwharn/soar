
const { defineConfig } = require('cypress');
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on('file:preprocessor', browserify.default(config));
  // on(require('cypress-plugin-api'))

  return config;

}

module.exports = defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASEURL || 'http://localhost:3000', 
        specPattern: '**/*.feature',
        defaultCommandTimeout: 10000,
        viewportWidth: 1600,
        viewportHeight: 900,
        setupNodeEvents,
    },
});
    

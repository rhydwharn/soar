
# SOAR ASSESSMENT

This repository contains an automated test suite using Cypress with Behavior-Driven Development (BDD) for attempting the SOAR assessment for a Senior QA role

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Tests](#running-the-tests)
- [Cypress in GitHub Actions](#cypress-in-github-actions)

## Prerequisites

Before you can run this project, ensure you have the following installed on your machine:

1. **Node.js**: Download and install from [Node.js website](https://nodejs.org/en/). (Ensure you have Node.js version 16.x or higher).
2. **npm**: Node Package Manager, which comes with Node.js.
3. **Git**: To clone this repository. Install from [Git's official website](https://git-scm.com/).

**You will need a working internet connection to pull the project dependencies. If these dependencies do not exist on the machine

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone my repository**:

   ```bash
   git clone https://github.com/rhydwharn/soar.git
   cd soar
   ```

2. **Install project dependencies**:

   Install all required npm packages that exist in my package.json file by running:

   ```bash
   npm install
   ```

   This will install all the dependencies listed in `package.json`.

## Dependencies

Here’s a list of the primary dependencies this project uses:

- **Cypress**: A JavaScript End-to-End testing framework.
- **Cypress-Cucumber Preprocessor**: Allows me to write Gherkin syntax for BDD.
- **@faker-js/faker**: I used this plugin to generate random data like usernames, passwords, etc.
- **cypress-fill-command**: This allows me to type my text fast rather than use the conventional type function
- **cypress-mailslurp**: This is the email tool I use to randomly create emails and read from the emails to fill OTPs
- **cypress-plugin-api**: This was used primarily to have a GUI of the api tests
  
Run this command to install these dependencies if not already installed:

```bash
npm install cypress @badeball/cypress-cucumber-preprocessor @faker-js/faker  cypress-fill-command cypress-mailslurp cypress-plugin-api
```

## Project Structure

The project is organized as follows:

```
soar/
│
├── cypress/
│   ├── fixtures/          # Warehouse all my test data
│   ├── e2e/               # This are the feature files in Gherkin syntax and the test steps
│   ├── plugins/           # Configuration for the plugins used
│   ├── support/           # This is where I wrote my custom commands that is used within the application
├── .env                   # This contains the environment variables
├── cypress.config.js       # Cypress configuration file
├── package.json            # Lists project dependencies and scripts
├── README.md               # This file which describes context on how to use the codes I submitted.
```

## Configuration

### Environment Variables (.env)

Make sure to create a `.env` file in the root of your project. This file will store environment-specific variables.

```
CYPRESS_baseUrl=https://staging.trymima.com
```

**Note**: Cypress automatically loads `.env` variables when running the tests.

### Cypress Configuration (cypress.config.js)

The Cypress configuration file defines various settings such as timeouts, viewport sizes, baseUrl, etc.

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: Cypress.env('baseUrl') || 'https://staging.trymima.com',
    specPattern: '**/*.feature',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Plugins code goes here
    }
  }
});
```

## Running the Tests

### Run All Tests:

You can run all tests with this command:

```bash
npx cypress run
```

### Run Tests in Interactive Mode:

To run Cypress in interactive mode (useful for debugging):

```bash
npx cypress open
```

### Running Tests in Headless Mode:

```bash
npx cypress run --headless
```

## Cypress in GitHub Actions

I integrated this Cypress test suite with GitHub Actions for CI/CD.

Create a `.github/workflows/config.yml` file and add the following:

```yaml
name: Run Cypress

on:
  push:

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Show Environment Variables
        run: |
          echo "CYPRESS_BASEURL='https://staging.trymima.com'"
          echo "CYPRESS_APIBASEURL='https://reqres.in'"
          echo "CYPRESS_MAILSLURP_API_KEY=${{ secrets.MAILSLURP_API_KEY }}"

      - name: Create .env File
        run: |
          echo "CYPRESS_BASEURL='https://staging.trymima.com'" > .env
          echo "CYPRESS_APIBASEURL='https://reqres.in'" >> .env
          echo "CYPRESS_MAILSLURP_API_KEY=${{ secrets.MAILSLURP_API_KEY }}" >> .env

      - name: Install Dependencies
        run: npm install

      - name: Cypress Execution
        uses: cypress-io/github-action@v6
        with:
          browser: chrome
        env:
          CYPRESS_MAILSLURP_API_KEY: ${{ secrets.MAILSLURP_API_KEY }}
          CYPRESS_BASEURL: "https://staging.trymima.com"
          CYPRESS_APIBASEURL: "https://reqres.in"
```

## Additional Notes

- **Fixtures**: The test data for credentials is stored in the `cypress/fixtures/credentials.json` 
- **Test Data**: The data required for the tests is generated using `@faker-js/faker`.
  
If you encounter any issues or bugs, feel free to reach out to me on ridwan.abdulazeez1@gmail.com

---

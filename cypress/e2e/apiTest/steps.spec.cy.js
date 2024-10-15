import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const { faker } = require("@faker-js/faker")

let userData = {};
let authToken = '';
let registrationPath = "/api/register"
let loginPath = "/api/login"

Given('I generate a valid user payload', () => {
    //UserData [Request body declaration]
    //reqres requires static data for registration. Else it fails.
    //Hence, the reason I am using static data
  userData = {
    email: "eve.holt@reqres.in",
    password: "pistol",
  };
});

Then('I send the registration request', () => {
  cy.api({
    method: 'POST',
    url: Cypress.env("apiBaseUrl")+registrationPath,
    body: userData,
    //Ensures that the script does not stop when the status code is not 200
    failOnStatusCode: false
  }).then((response) => {
    // Validate Status code for registration
    expect(response.status).to.eq(200); 

    //Validate response body key
    expect(response.body).to.have.property('token'); 
  });
});

Then('I use the credentials created, to login', () => {
  cy.api({
    method: 'POST',
    url: Cypress.env("apiBaseUrl")+loginPath,
    body: {
      email: userData.email,
      password: userData.password,
    },
  }).then((response) => {
    // Validate status code for successful login
    expect(response.status).to.eq(200); 

    //Validate response body key
    expect(response.body).to.have.property('token'); 

    //Pass the token returned from the API response body to authToken
    authToken = response.body.token;
  });
});

// Validate Basic Authentication
Given('I have a valid user token', () => {
  // Assuming login was successful and authToken is available
  expect(authToken).to.not.be.empty;
});

Then('I should receive a 200 status code and valid login', () => {
  cy.api({
    method: 'POST',
    body: userData,
    url: Cypress.env("apiBaseUrl")+loginPath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      //Ensures that the script does not stop when the status code is not 200
    failOnStatusCode: false
    },
  }).then((response) => {
    expect(response.status).to.eq(200); // Status code for profile details success
    expect(response.body).to.have.property('token');
    // expect(response.body).to.have.property('email', userData.email);
  });
});
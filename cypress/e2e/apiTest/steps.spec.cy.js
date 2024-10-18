import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

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

When('I send the registration request, then validate the response and status code', () => {
  cy.api({
    method: 'POST',
    url: Cypress.env("APIBASEURL")+registrationPath,
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

Then('I use the credentials created, to login, validate the response and status code', () => {
  cy.api({
    method: 'POST',
    url: Cypress.env("APIBASEURL")+loginPath,
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
Given('I have a valid endpoint', () => {
  // Print the API BASE URL
  cy.log(Cypress.env("APIBASEURL"));
});

Then('I perform basic validation on the response from the endpoint', () => {
  cy.api({
    method: 'POST',
    body: userData,
    url: Cypress.env("APIBASEURL")+loginPath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      //Ensures that the script does not stop when the status code is not 200
    failOnStatusCode: false
    },
  }).then((response) => {
    if (response.status == 200) {
      cy.log("Success");
    }
    else if (response.status == 400) {
      cy.log("Bad Request");
    }
    else if (response.status == 405)
      {
        cy.log("Method not allowed");
      }
    else if (response.status == 500) 
      {
        cy.log("Server Error");
      }
  });
});

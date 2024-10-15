import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const baseUrl = Cypress.env('BASEURL');

Given(/^I am able to navigate to the login page and change the "([^"]*)"$/, (viewport) => {
    //Set the dimension of the device.
    //The dimensions have been declared on the feature file
    cy.viewport(viewport);

    // Visit the base URL
    cy.visit(baseUrl);

    // Navigate to the login page
    cy.visit(`${baseUrl}/login`);
});

Then(/^I fill in the "([^"]*)"$/, (args1) => {
    //Custom Command to fill all data that has similar feature pattern
    cy.insertDetails(args1)
});

Then(/^I click "([^"]*)" Button$/, (element) => {
    //Custom Command to click all elements that has similar feature pattern
    cy.clickSpecifiedElement(element)
});

Then(/^I should see the following on the dashboard$/, (datatable) => {
    //Assert all items on the Quicklink
	datatable.hashes().forEach((row)=>{
    cy.contains(row.quicklinks).should('exist').and('contain', row.quicklinks)
  })
});

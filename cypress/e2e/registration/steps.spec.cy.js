import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const { faker } = require("@faker-js/faker")
const baseUrl = Cypress.env('BASEURL');

let data
let details
let basic
let other
let identification
let login

before(() => {
    //Page selectors fixture file
    cy.fixture('selectors').then(sel => {
        data = sel
        basic = data.basicDetailsPage
        other = data.otherDetailsPage
        identification = data.otpPage
        login = data.loginPage
    })
    //Credentials fixture file
    cy.fixture('credentials').then(cred => {
        details = cred
    })
})

Given(/^I navigate to regisrtation page$/, () => {
    // Visit the base URL
    cy.visit(baseUrl);

    // Navigate to the Signup Page
    cy.visit(`${baseUrl}/signup`);
});

Then(/^I click "([^"]*)" Button$/, (element) => {
    //Custom Action to Click Specified elements
    cy.clickSpecifiedElement(element)
});

When(/^I insert the business email$/, () => {
    //Custom Action to input generated email
    cy.insertEmail()
});

Then(/^I insert the existing business email$/, () => {
    //Custom Action to use saved email
    cy.existingEmail()
});

When(/^I insert a unique phone number$/, () => {
    //Custom Action to insert unique phone number
    cy.uniquePhoneNumber()
});

When(/^I select "([^"]*)" as how I heard about mima$/, (text) => {
    //Custom Command to select how I heard about the product
    cy.heardAboutUs(text)
});

Then(/^I should see the OTP page$/, () => {
    //Custom Command to verify OTP sent to the user email
    cy.verifyOtpPage()
});

When(/^I insert the OTP$/, () => {
    //Custom Command to insert the OTP retrieved from the user email
    cy.insertOTP()
});

Then(/^I should see the following on the dashboard$/, (datatable) => {
    //Assert the values on the sidebar after login is successful
    datatable.hashes().forEach((row) => {
        cy.contains(row.sidebar).should('exist').and('contain', row.sidebar)
    })
});

When(/^I fill in the "([^"]*)"$/, (args1) => {
    //Custom Command to fill all fields with similar pattern
    cy.insertDetails(args1)
});

Then(/^I validate "([^"]*)"$/, (args1) => {
    //Custom Command to validate error when email already exist
    cy.validateError(args1)
});

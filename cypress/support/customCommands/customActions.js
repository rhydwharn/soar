import { faker } from '@faker-js/faker'
let data
let details
let basic
let other
let identification
let login
let inboxId
let emailAddress
let password = "Testing123."

before(() => {
    //Credentials
    cy.fixture('credentials').then(cred => {
        details = cred
    })
    //Page selecctors
    cy.fixture('selectors').then(sel => {
        data = sel
        basic = data.basicDetailsPage
        other = data.otherDetailsPage
        identification = data.otpPage
        login = data.loginPage
    })
})

//Custom command to click specified elements using cy.contains
Cypress.Commands.add('clickSpecifiedElement', (element) => {
    cy.contains(element).should('be.visible').and('exist').click()
})

//Custom Command to click element using cy.get
Cypress.Commands.add('clickElement', (element) => {
    cy.get(element).click()
})

//Custom Command to generate unique phone number and insert into the phone number field
Cypress.Commands.add('uniquePhoneNumber', () => {
    cy.get(basic.bizPhoneNum).should('exist').fill(faker.phone.number('+23481#######'))
})

//Custom Command to type email stored in the credentials json file
Cypress.Commands.add('existingEmail', () => {
    cy.typeAText(basic.bizEmailField, details.email)
})

//Custom Command to insert user email
Cypress.Commands.add('insertEmail', () => {
    faker.em
    //Instantiate the mailslurp
    cy.mailslurp().then(mailslurp => mailslurp.createInbox().then(inbox => {
        //Declare the inbox ID on mailslurp
        inboxId = inbox.id
        //Declare the emaill address
        emailAddress = inbox.emailAddress
        //Input the email address generated from mailslurp
        cy.get(basic.bizEmailField).fill(emailAddress)

        //Save data to vairable that will be saved in the credentials.json file
        const userDetails = `
              {
                "email": "${emailAddress}",
                "password": "Test1234@"
              }
    `
    //Write the credentials to a file
        cy.writeFile('cypress/fixtures/credentials.json', userDetails)
    }))
})

//Custom Command to insert OTP retrieved from the user email inserted during registration
Cypress.Commands.add('insertOTP', () => {
    //Instantiate mailslrup to retrieve latest email
    cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true).then(email => {
        //Email body
        const emailBody = email.body
        const parser = new DOMParser()
        const doc = parser.parseFromString(emailBody, "text/html")
        //Locator for the OTP text in the email sent
        const code = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3)').textContent
        const otp = code.trim()
        //Wrap the OTP text
        cy.get(identification.inputBox).each(($el, index) => {
            cy.wrap($el).should('be.visible').type(otp[index])
        })
    }))
})

//Custom Command to type any text
Cypress.Commands.add('typeAText', (field, text) => {
    cy.get(field).should('be.visible').and('exist').fill(text)
})

//Custom Command to assert text on the OTP page
Cypress.Commands.add('verifyOtpPage', () => {
    cy.get(identification.otpVerification).should('be.visible').and('have.text', 'Please enter the code below')
})

//Custom Command to select how user heard about the product.
Cypress.Commands.add('heardAboutUs', (element) => {
    cy.get(other.heardAboutUs).should('be.visible').and('exist').click()
    cy.get(other.aboutUsList).contains(element).should('exist').click()
})

//Custom Command to fill any data
Cypress.Commands.add('insertDetails', (string) => {
    switch (string) {
        case 'fullname': //fullname case switch
            cy.typeAText(basic.fullnameField, faker.person.fullName())
            break
        case 'businessname'://business name case switch
            cy.typeAText(basic.bizNameField, faker.company.name())
            break
        case 'businessRegNum': //business registration number case switch
            cy.typeAText(basic.bizRegNum, faker.string.alphanumeric(6))
            break
        case "password": //password case switch
            cy.typeAText(other.passwordField, password)
            break;
        case "username": //username case switch
            cy.typeAText(login.email, details.email)
            break
    }
})

//Custom Command to fill any information. The fill command is using a dev dependency [cypress-fill-command]
Cypress.Commands.add('fillDetails', (field, text) => {
    cy.get(`#${field}`).should('be.visible').and('exist').fill(text)
})

//Custom Command to Login
Cypress.Commands.add('Login', () => {
    cy.clickSpecifiedElement('Log in')
    cy.typeAText(other.emailField, details.email)
    cy.typeAText(other.passwordField, details.password)
    cy.clickSpecifiedElement('Login')
    cy.contains('Select a Plan').should('be.visible')
})

//Custom Command to validate error when the email already exist
Cypress.Commands.add('validateError', (args1) => {
    //Assert text
    cy.get('.Toastify__toast-body > :nth-child(2)')
    cy.contains("Hey we seem to have your records, kindly login with your email")
})
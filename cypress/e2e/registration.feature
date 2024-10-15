    Feature: Registration
    
        Scenario Outline:  Registration with valid credentials choosing <option>.
        Given I navigate to regisrtation page
        When I fill in the "fullname"
        And I fill in the "businessname"
        And I insert the business email
        And I insert a unique phone number
        And I fill in the "businessRegNum"
        And I click "Next" Button
        And I select "<option>" as how I heard about mima
        And I fill in the "password"
        And I click "Sign Up" Button
        Then I should see the OTP page
        When I insert the OTP
        Then I should see the following on the dashboard
            | sidebar              |
            | Home                 |
            | Customer             |
            | Invoice & Accounting |
            | Orders               |
            | Payment Link         |
            | Booking              |
            | Paybills             |

        Examples:
            | option    |
            | Instagram |         
            # | Facebook  |
            # | Twitter   |
@focus 
    Scenario Outline:  Registration with existing credentials choosing <option>.
        Given I navigate to regisrtation page
        When I fill in the "fullname"
        And I fill in the "businessname"
        And I insert the existing business email
        And I insert a unique phone number
        And I fill in the "businessRegNum"
        And I click "Next" Button
        And I select "<option>" as how I heard about mima
        And I fill in the "password"
        And I click "Sign Up" Button
        Then I validate "error message"
        Examples:
            | option    |
            | Instagram | 
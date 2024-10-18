Feature: Registration

    Scenario Outline:  Registration with valid credentials choosing <option>.
        Given I navigate to regisrtation page
        When I am on the hompage
        Then I fill in the "fullname"
        Then I fill in the "businessname"
        Then I insert the business email
        Then I insert a unique phone number
        Then I fill in the "businessRegNum"
        Then I click "Next" Button
        Then I select "<option>" as how I heard about mima
        Then I fill in the "password"
        Then I click "Sign Up" Button
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

    Scenario: Login with created credentials

        Given I set the screen type for my test "<viewport>"
        Then I navigate to the login page
        Then I fill in the "username"
        Then I fill in the "password"
        And I click "Login" Button
        Then I should see the following on the dashboard
            | sidebar              |
            | Get Business Report  |
            | Send Money           |
            | Add Customer         |
            | Send Invoice/Receipt |
            | Add Transaction      |
        # | Booking              |
        # | Paybills             |
        Examples:
            | viewport  |
            | iphone-6  |
            | iphone-6+ |
            | ipad-2    |
            | ipad-mini |

    Scenario Outline:  Registration with existing credentials choosing <option>.
        Given I navigate to regisrtation page
        When I am on the hompage
        Then I fill in the "fullname"
        Then I fill in the "businessname"
        Then I insert the existing business email
        Then I insert a unique phone number
        Then I fill in the "businessRegNum"
        Then I click "Next" Button
        Then I select "<option>" as how I heard about mima
        Then I fill in the "password"
        Then I click "Sign Up" Button
        Then I validate "error message"
        Examples:
            | option    |
            | Instagram |

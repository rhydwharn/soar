Feature: Login

    Login with saved credentials

    Scenario: Valid credentials login

    Given I am able to navigate to the login page and change the "<viewport>"
    # When I set the viewport to "<viewport>"
    Then I fill in the "username"
    Then I fill in the "password"
    And I click "Login" Button
    Then I should see the following on the dashboard
            | quicklinks              |
            | Get Business Report                 |
            | Send Money             |
            | Add Customer |
            | Send Invoice/Receipt               |
            | Add Transaction         |
            # | Booking              |
            # | Paybills             |
    Examples:
    | viewport       |
    | iphone-6      |
    | iphone-6+     |
    | ipad-2        |
    | ipad-mini     |
    
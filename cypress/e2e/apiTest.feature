Feature: Registration and Login API Tests

  Scenario: User registration and login validation
    Given I generate a valid user payload
    Then I send the registration request
    Then I use the credentials created, to login

  Scenario: Basic validation for login endpoint
    Given I have a valid user token
    Then I should receive a 200 status code and valid login
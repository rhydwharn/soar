Feature: Registration and Login API Tests

  Scenario: User registration and login validation
    Given I generate a valid user payload
    When I send the registration request, then validate the response and status code
    Then I use the credentials created, to login, validate the response and status code

  Scenario: Basic validation for login endpoint
    Given I have a valid endpoint
    Then I perform basic validation on the response from the endpoint
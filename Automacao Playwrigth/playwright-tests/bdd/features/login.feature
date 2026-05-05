Feature: Login

  As a registered user
  I want to authenticate in the system
  So that I can access protected features

  @smoke
  Scenario: Access login page
    Given the user accesses the login page
    When the page is loaded
    Then the login form should be displayed

  @regression
  Scenario: Login with valid credentials
    Given the user accesses the login page
    When the user submits valid credentials
    Then the system should process the authentication

  @negative
  Scenario: Login with invalid credentials
    Given the user accesses the login page
    When the user submits invalid credentials
    Then the system should display an authentication error

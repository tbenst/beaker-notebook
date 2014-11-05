Feature: Users
  As a researcher
  I want to provide user information
  So others can find out more about me

  Scenario: Changing user information
    Given I'm signed in as a researcher
    When I go to the edit user page
    And I fill in the edit user form with:
      | name    | email          | currentPassword |
      | New Name| newEmail@m.com | password        |
    Then I should see the header greeting "Hi, New Name"

  Scenario: Wrong password when editing
    Given I'm signed in as a researcher
    When I go to the edit user page
    And I fill in the edit user form with:
      | name     | email          | currentPassword |
      | New Name | newEmail@m.com | wrongpassword   |
    Then I should see an error message of "Error: Wrong Password"

Feature: Users
  As a researcher
  I want to provide user information
  So others can find out more about me

  Scenario: Changing user information
    Given I'm signed in as a researcher
    When I go to the edit user page
    And I fill in the edit user form with:
      | name    | email          | currentPassword | job_title   | company | bio         |
      | New Name| newEmail@m.com | password        | Researcher  | MIT     | I like math |
    Then I should see the header greeting "Hi, New Name"
    When I view the market search
    And I go to the edit user page
    Then I should see the following user:
      | name    | email          | jobTitle   | company | bio         |
      | New Name| newEmail@m.com | Researcher | MIT     | I like math |

  Scenario: Wrong password when editing
    Given I'm signed in as a researcher
    When I go to the edit user page
    And I fill in the edit user form with:
      | name     | email          | currentPassword |
      | New Name | newEmail@m.com | wrongpassword   |
    Then I should see an error message of "Error: Wrong Password"

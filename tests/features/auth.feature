Feature: Authentication
As a researcher, I need to provide my user identity.

  Scenario: Sign in
    Given I signed up as a researcher
    And I'm not signed in
    When I go to the sign in page
    And I fill in the sign in form with:
      | email           | password |
      | u@r.edu         | password |
    Then I should see the header greeting "Hi, joe research"

  Scenario: Sign out
    Given I'm signed in as a researcher
    When I click the sign out link
    Then I should see I've been signed out
    When I go to my projects
    Then I should see the sign in form

  Scenario: Unauthorized access
    Given I'm not signed in
    When I go to my projects
    Then I should see the sign in form

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

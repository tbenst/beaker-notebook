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
    And I should see navigation

  Scenario: Sign out
    Given I'm signed in as a researcher
    When I click the sign out link
    Then I should see I've been signed out
    When I navigate to my projects
    Then I should see the sign in form

  Scenario: Unauthorized access
    Given I'm not signed in
    When I navigate to my projects
    Then I should see the sign in form
    And I shouldn't see navigation

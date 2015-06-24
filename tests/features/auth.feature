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

  Scenario: Case insensitive sign in
    Given I signed up as a researcher
    And I'm not signed in
    When I go to the sign in page
    And I fill in the sign in form with:
      | email           | password |
      | U@R.edu         | password |
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

  Scenario: Beaker sign in
    Given I signed up as a Beaker user
    And I view the Beaker publications page
    When I go to the Beaker sign in page
    And I fill in the sign in form with:
      | email         | password |
      | beaker@r.edu  | password |
    Then I should see the header greeting "Hi, Beaker user"

  Scenario: Beaker sign up
    When I view the Beaker publications page
    And I go to the Beaker sign up page
    And I fill in the sign up form with:
      | name        | email         | password |
      | Beaker user | beaker@r.edu  | password|
    Then I should see the header greeting "Hi, Beaker user"

  Scenario: Sign in to Bunsen with Beaker user
    Given I signed up as a Beaker user
    And I'm not signed in
    When I go to the Bunsen sign in page
    And I fill in the sign in form with:
      | email         | password |
      | beaker@r.edu  | password |
    Then I should see the sign in error "Error: Invalid user or password"

  Scenario: Detect duplicate emails on sign up
    Given I signed up as a researcher
    And I'm not signed in
    When I view the Beaker publications page
    And I go to the Beaker sign up page
    And I fill in the sign up form with:
      | name        | email   | password |
      | Beaker user | u@r.edu | password |
    Then I should see the sign up error "Error: email already taken"

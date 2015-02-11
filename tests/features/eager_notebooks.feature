Feature: Eager Notebook Loading
So a user can get to their open notebooks faster we load
all of the open notebooks in the background when they first login.

  Background:
    Given I'm signed in as a researcher
    And I have the following Projects:
      | name               | description  | openedAt                |
      | ghost of tom jones | watch out    | 2000-01-01 00:00:00.000 |
    And I have the following notebooks:
      | name               | projectName        | openedAt                | open |
      | top secret         | ghost of tom jones | 1990-01-01 00:00:00.000 | true |
      | powderpuff girls   | ghost of tom jones | 1991-01-01 00:00:00.000 | true |
    And I view my projects

  Scenario: Load recent notebooks after authentication
    Given I'm not signed in
    When I go to the sign in page
    And I fill in the sign in form with:
      | email           | password |
      | u@r.edu         | password |
    Then 2 notebooks should load in the background

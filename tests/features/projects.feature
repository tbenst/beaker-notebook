Feature: Manage Projects
As a researcher, I want to manage my projects.

  Background:
    Given I'm signed in as a researcher

  Scenario: Create a project
    When I create a project
    Then I should see a new project in my list
    When I open the project
    Then I should see the project detail page

  Scenario: Edit a project
    Given I'm looking at a project
    When I edit the project
    And I update the project as follows:
      | name            | description          |
      | Science Project | For the Science Fair |
    Then I should see that the project details are:
      | name            | description          |
      | Science Project | For the Science Fair |

  Scenario: Delete a project
    Given I'm looking at a project
    When I edit the project
    And I delete the project
    Then I should see that I have no projects in my list

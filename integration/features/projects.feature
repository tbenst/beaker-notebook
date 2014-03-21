Feature: Manage Projects
As a researcher, I want to manage my projects.

  Background:
    Given I'm signed in as a researcher

  Scenario: Create a project
    When I create a project
    Then I should see a new project in my list
    When I open the project
    Then I should see the project detail page

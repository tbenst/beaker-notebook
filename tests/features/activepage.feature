Feature: Active Page

  Background:
    Given I'm signed in as a researcher

  Scenario: Viewing marketplace
    When I view the market search
    Then I should see the "market-place" menu item active

  Scenario: Viewing projects
    When I'm looking at a project
    Then I should see the "projects" menu item active

  Scenario: Viewing subscriptions
    When I view My Datasets
    Then I should see the "subscriptions" menu item active

  Scenario: Viewing publications
    When I view the publications page
    Then I should see the "publications" menu item active

  Scenario: Header logo should link to projects page
    When I click the header logo
    Then I should see the "projects" menu item active

Feature: Admin Datasets
  Background:
    Given I'm signed in as an administrator
    And I have a default catalog
    And there is a market item

  Scenario: Viewing the marketplace
    When I view the market search
    Then I should see the edit indicator

  Scenario: Deleting a dataset
    When I view the market search
    And I edit a dataset
    And I delete the dataset
    Then I should see the Admin Panel heading
    When I view the market search
    Then I should see 0 market item on the market list page

  Scenario: Editing a dataset
    When I view the market search
    And I edit a dataset
    And I update the dataset name to "wow"
    And I view the market search
    Then I should see a dataset with the name "wow"

  Scenario: Editing a dataset from the detail
    When I view the market search
    And I view the first market item
    Then I should see the edit the market item indicator
    When I edit the market item from the detail view
    Then I should see the dataset editor.

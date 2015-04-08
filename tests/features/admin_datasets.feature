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
    And I enter the dataset name as "wow"
    And I update the dataset
    And I view the market search
    Then I should see a dataset with the name "wow"

  Scenario: Editing a dataset from the detail
    When I view the market search
    And I view the first market item
    Then I should see the edit the market item indicator
    When I edit the market item from the detail view
    Then I should see the dataset editor.

  Scenario: Dataset category dropdown
    And I have the following categories:
      | name       | path  |
      | finance    | 0.1.1 |
      | canada     | 0.1.2 |
    When I view the market search
    And I edit a dataset
    And I enter "finance" into the category field
    Then I should see a category autocomplete dropdown with "finance (0.1.1)"

  Scenario: Invalid entry in dataset category
    And I have the following categories:
      | name       | path  |
      | canada     | 0.1.2 |
    When I view the market search
    And I edit a dataset
    And I enter "fin" into the category field
    Then I should see that the category is invalid
    When I update the dataset
    And I refresh the page
    Then I should see the category field is empty

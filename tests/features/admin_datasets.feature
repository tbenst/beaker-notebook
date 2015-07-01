Feature: Admin Datasets
  Background:
    Given I'm signed in as an administrator
    And I have a default catalog
    And I have a default vendor
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
    Then I should see 0 market items on the market list page
  @flaky
  Scenario: Editing a dataset
    When I view the market search
    And I edit a dataset
    And I enter the dataset name as "wow"
    And I update the dataset
    And I view the market search
    Then I should see a dataset with the name "wow"

  @flaky
  Scenario: Creating a dataset
    Given I have the following categories:
      | name       | parent      |
      | finance    | catalog_0.1 |
    When I create a new dataset with
      | name   | category |
      | stacy  | finance  |
    And I view the market search
    Then I should see 2 market items on the market list page
  @flaky
  Scenario: Changing a datasets category
    Given I have the following categories:
      | name       | parent      |
      | finance    | catalog_0.1 |
      | beer       | catalog_0.1 |
    When I create a new dataset with
      | name   | category |
      | stacy  | finance  |
    And I view the market search
    And I edit the "stacy" dataset
    And I set the category to "beer"
    When I view the market search
    Then I should see 1 items in the "Beer" category count

  Scenario: Editing a dataset from the detail
    When I view the market search
    And I view the first market item
    Then I should see the edit the market item indicator
    When I edit the market item from the detail view
    Then I should see the dataset editor.

  Scenario: Dataset category dropdown
    And I have the following categories:
      | name       | parent      |
      | finance    | catalog_0.1 |
      | canada     | catalog_0.1 |
    When I view the market search
    And I edit a dataset
    And type "finance" into the category field
    Then I should see a category autocomplete dropdown with "finance"

  Scenario: Invalid entry in dataset category
    Given I have the following categories:
      | name       | parent      |
      | canada     | catalog_0.1 |
    When I view the market search
    And I edit a dataset
    And I enter "fin" into the category field
    Then I should see that the category is invalid
    When I update the dataset
    And I refresh the page
    Then I should see the category field is empty

  @flaky @broken
  Scenario: Dataset format dropdown
    Given there is a market item with the title "Item 1" and the format "MAGIC"
    And there is a market item with the title "Item 2" and the format "CSV"
    When I view the market search
    And I edit a dataset
    And I enter "csv" into the format field
    Then I should see a format-field autocomplete dropdown with "CSV"

  @flaky @actually-broken-vendors
  Scenario: Dataset vendor dropdown
    Given there is a market item with the vendor "George data"
    And there is a market item with the vendor "Doge industries"
    When I view the market search
    And I edit a dataset
    And I enter "Doge industries" into the vendor field
    Then I should see a vendor-field autocomplete dropdown with "Doge industries"

  Scenario: Dataset tags dropdown
    Given there is a market item with the title "Item 2" and the format "CSV"
    And there is a market item with the tags "cat man carson,dog,human"
    When I view the market search
    And I view the "Item 2" market item
    And I edit the market item from the detail view
    And I enter "dog" into the tags field
    Then I should see a tag-field autocomplete dropdown with "dog"
  @flaky
  Scenario: Adding tags on a new dataset
    Given I have the following categories:
      | name       | parent      |
      | finance    | catalog_0.1 |
    When I create a new dataset with
      | name   | category | tag  | vendor      |
      | stacy  | finance  | tank | Some vendor |
    And I edit the "stacy" dataset
    Then I should see the "tank" tag
  @flaky
  Scenario: Saving a new dataset tag
    When I view the market search
    And I edit a dataset
    And I enter "dog" into the tags field
    And I click the add button
    And I update the dataset
    When I refresh the page
    Then I should see the "dog" tag
  @flaky
  Scenario: Deleting a datset tag
    When I view the market search
    And I edit a dataset
    And I click the "one" tag
    And I update the dataset
    When I refresh the page
    Then I should not see any tags

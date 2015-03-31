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

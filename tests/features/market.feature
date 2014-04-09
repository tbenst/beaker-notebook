Feature: Market Place Searching
As a researcher, I want to be able to use the market place.

  Background:
    Given I'm signed in as a researcher

  Scenario: See a market item
    When there is a market item
    And I view the market search
    Then I should see "1" market item on the market list page

  Scenario: Filtering market items by text
    When there is a market item
    And I view the market search
    And I filter the market page by "this will not match"
    Then I should see "0" market item on the market list page

  Scenario: Filtering market items by tag
    When there is a market item with the tags "cat,dog,human"
    And I view the market search
    And I filter by search by select the "cat,dog,human" tags
    Then I should see "1" market item on the market list page

  Scenario: Paginated market items
    When there is "22" market items
    And I view the market search
    Then I should see "10" market item on the market list page
    And I should see "22" total results

  Scenario: Market place filter persistence
    When there is a market item with the tags "cat,dog,human"
    And I view the market search
    And I filter by search by select the "cat" tags
    And I view the first market item
    And I return to the market results
    Then I should see the "cat" tags selected

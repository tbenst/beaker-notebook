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


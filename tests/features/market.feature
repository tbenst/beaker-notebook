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
    When there is a market item with the format "MAGIC"
    And there is a market item with the format "CSV"
    And I view the market search
    And I filter by search by selecting the "MAGIC" formats
    Then I should see "1" market item on the market list page

  Scenario: Filtering market items by format
    When there is a market item with the tags "cat,dog,human"
    And I view the market search
    And I filter by search by selecting the "cat,dog,human" tags
    Then I should see "1" market item on the market list page

  Scenario: Filtering market items by vendor
    When there is a market item with the vendor "George data"
    And there is a market item with the vendor "Doge industries"
    And I view the market search
    And I filter by search by selecting the "George data" vendors
    Then I should see "1" market item on the market list page

  Scenario: Stacking market item filters
    When there is a market item with the vendor "George data"
    And there is a market item with the format "MAGIC"
    And I view the market search
    And I filter by search by selecting the "George data" vendors
    Then I should see "1" market item on the market list page
    And I filter by search by selecting the "MAGIC" formats
    Then I should see "0" market item on the market list page
    And I filter the market page by "Credit"
    Then I should see "0" market item on the market list page

  Scenario: Paginated market items
    When there is "22" market items
    And I view the market search
    Then I should see "10" market item on the market list page
    And I should see "22" total results

  Scenario: Market place filter persistence
    When there is a market item with the tags "cat,dog,human"
    And I view the market search
    And I filter by search by selecting the "cat" tags
    And I view the first market item
    And I return to the market results
    Then I should see the "cat" tags selected

  Scenario: Related market items
    Given I have the following market items:
      | title                       | tags                      |
      | Quarterly E-commerce Report | finance,e-commerce        |
      | Amazon Annual Report        | amazon,e-commerce,finance |
      | The World Bank Report 2013  | finance,world bank        |
    And I view the market search
    When I view the "Quarterly E-commerce Report" market item
    Then I should see "Amazon Annual Report" is related
    When I view the "Amazon Annual Report" related item
    Then I should see no related items

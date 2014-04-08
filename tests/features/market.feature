Feature: Market Place Searching
As a researcher, I want to be able to use the market place.

  Background:
    Given I'm signed in as a researcher

  Scenario: See a market item
    When there is a market item
    And I view the market search
    Then I should see the market item on the market list page



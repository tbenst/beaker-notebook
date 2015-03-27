Feature: Admin Datasets
  Scenario: Viewing the marketplace
    Given I'm signed in as an administrator
    And I have a default catalog
    And there is a market item
    When I view the market search
    Then I should see the edit indicator

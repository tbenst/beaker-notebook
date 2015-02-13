Feature: Vendor Panel
  As an administrator
  I want to manage vendors

  Scenario: Clearing a vendor name
    Given I'm signed in as an administrator
    When I go to the vendors page
    And I enter and clear the vendor name
    Then I should see an empty vendor name field

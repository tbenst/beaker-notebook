Feature: Vendor Panel
  As an administrator
  I want to manage vendors

  Background:
    Given I'm signed in as an administrator
    And I have the following Vendors:
      | name       |
      | MojoTech   |
      | RC Cola    |
    And I go to the vendors page

  Scenario: Creating a vendor
    When I create the vendor "Apple"
    Then I should see 3 vendors in the vendor list

  Scenario: Clearing a vendor name
    When I enter and clear the vendor name
    Then I should see an empty vendor name field

  Scenario: Deleting a vendor
    When I delete the vendor "RC Cola"
    Then I should see 1 vendor in the vendor list

  Scenario: Updating a vendor
    When I rename the vendor "RC Cola" to "Pepsi"
    Then the vendor should now be named "Pepsi"

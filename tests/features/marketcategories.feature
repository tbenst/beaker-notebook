Feature: Market Place Categories
As a researcher, I want to be able to browse the market place.

  Background:
    Given I'm signed in as a researcher
    And I have a default catalog
    And I have the following Vendors:
      | name              |
      | Some vendor       |
    And I have the following categories:
      | name       | parent      |
      | finance    | catalog_0.1 |
      | canada     | catalog_0.1 |

  Scenario: Browse market items by category
    Given I have the following market items:
      | title                  | categories |
      | Credit Card Complaints | finance    |
      | Crime Rates, Canada    | canada     |
    When I view the market search
    And I browse the default catalog by category "Finance"
    Then I should see 1 market item on the market list page
    And I should see the "Credit Card Complaints" market item on the market list page

  Scenario: Reset filters when browsing market items by category
    Given I have the following Vendors:
      | name                 |
      | CFPB                 |
      | Statistics Canada    |
    Given I have the following market items:
      | title                  | categories | vendor            |
      | Credit Card Complaints | finance    | CFPB              |
      | Crime Rates, Canada    | canada     | Statistics Canada |
    When I view the market search
    And I filter marketplace by vendor "CFPB"
    Then I should see 1 market item on the market list page
    And I browse the default catalog by category "Canada"
    Then I should see 1 market item on the market list page
    And I should see the "Crime Rates, Canada" market item on the market list page

##The category count is not tripped with seed routes, so this test fails.
@flaky
  Scenario: Category item count
    Given I have the following market items:
      | title                      | categories |
      | Credit Card Complaints     | finance    |
      | World Bank Contract Awards | finance    |
      | Crime Rates, Canada        | canada     |
    When I view the market search
    Then I should see 2 items in the "Finance" category count

  Scenario: Data set details category
    Given I have the following market items:
      | title               | categories |
      | Crime Rates, Canada | canada     |
    And I view the market search
    When I view the "Crime Rates, Canada" market item
    Then I should see the category "canada"

  Scenario: Category meta-data description
  Given I have the following categories:
    | name   | parent      | description                    |
    | Energy | catalog_0.1 | Federal energy policy datasets |
  When I view the market search
  And I browse the default catalog by category "Energy"
  Then I should see the category description "Federal energy policy datasets"

  Scenario: Category meta-data owner
	Given I have the following categories:
	  | name   | parent      | contact-name | description                    |
	  | Energy | catalog_0.1 | Paul         | Federal energy policy datasets |
  When I view the market search
	And I browse the default catalog by category "Energy"
	Then I should see the category owner "Paul"

  Scenario: Using category tree
    Given I have the following categories:
      | name       | parent      |
      | Government | finance     |
    Given I have the following categories:
      | name       | parent      |
      | Officials  | Government  |
     Given I have the following categories:
      | name       | parent      |
      | Federal    | Officials   |
     Given I have the following categories:
      | name       | parent      |
      | State      | Officials   |
    When I view the market search
    And I open the marketplace category "Finance"
    And I open the marketplace category "Government"
    And I open the marketplace category "Officials"
    Then I should see the following categories in the navigation:
      | name       |
      | Federal    |
      | State      |

  Scenario: Category meta-data description
    Given I have the following categories:
      | name   | parent      | description                    |
      | Energy | catalog_0.1 | Federal energy policy datasets |
    And I have the following market items:
      | title                   | categories |
      | Nuclear power in Canada | Energy     |
    When I view the market search
    And I browse the default catalog by category "Energy"
    And I view the first market item
    And I return to the list from the market item
    Then I should see the category description "Federal energy policy datasets"

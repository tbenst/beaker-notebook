Feature: Market Place Categories
As a researcher, I want to be able to browse the market place.

  Background:
    Given I'm signed in as a researcher
    And I have a default catalog
    And I have the following categories:
      | name       | path  |
      | finance    | 0.1.1 |
      | canada     | 0.1.2 |

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

  Scenario: Category item count
	Given I have the following market items:
	    | title                      | categories |
      | Credit Card Complaints     | finance    |
      | World Bank Contract Awards | finance    |
      | Crime Rates, Canada        | canada     |
    When I view the market search
    And I open the default catalog
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
    | name   | path  | description                    |
    | Energy | 0.1.3 | Federal energy policy datasets |
  When I view the market search
  And I browse the default catalog by category "Energy"
  Then I should see the category description "Federal energy policy datasets"

  Scenario: Category meta-data owner
	Given I have the following categories:
	  | name   | path  | owner_name | description                    |
	  | Energy | 0.1.3 | Paul       | Federal energy policy datasets |
  When I view the market search
	And I browse the default catalog by category "Energy"
	Then I should see the category owner "Paul"

  Scenario: Using category tree
    Given I have the following categories:
      | name       | path    |
      | Government | 1.1     |
      | Officials  | 1.1.1   |
      | Federal    | 1.1.1.1 |
      | State      | 1.1.1.2 |
    When I view the market search
    And I open the marketplace category "Finance"
    And I open the marketplace category "Government"
    And I open the marketplace category "Officials"
    Then I should see the following categories in the navigation:
      | name       |
      | Federal    |
      | State      |

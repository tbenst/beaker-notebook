Feature: Market Place Categories
As a researcher, I want to be able to browse the market place.

  Background:
    Given I'm signed in as a researcher

  Scenario: Browse market items by category
    Given I have the following market items:
      | title                  | category |
      | Credit Card Complaints | finance  |
      | Crime Rates, Canada    | canada   |
    When I view the market search
    And I browse marketplace by category "finance"
    Then I should see 1 market item on the market list page
    And I should see the "Credit Card Complaints" market item on the market list page

  Scenario: Reset filters when browsing market items by category
    Given I have the following market items:
      | title                  | category | vendor            |
      | Credit Card Complaints | finance  | CFPB              |
      | Crime Rates, Canada    | canada   | Statistics Canada |
    When I view the market search
    And I filter marketplace by vendor "CFPB"
    Then I should see 1 market item on the market list page
    And I browse marketplace by category "canada"
    Then I should see 1 market item on the market list page
    And I should see the "Crime Rates, Canada" market item on the market list page

  Scenario: Category item count
  	Given I have the following market items:
  	  | title                      | category |
      | Credit Card Complaints     | finance  |
      | World Bank Contract Awards | finance  |
      | Crime Rates, Canada        | canada   |
    When I view the market search
    Then I should see 2 items in the "finance" category count

  Scenario: Data set details category
    Given I have the following market items:
      | title               | Category |
      | Crime Rates, Canada | Canada   |
    When I view the data set details for "Crime Rates, Canada"
    Then I should see the category "Canada"

  Scenario: Category meta-data description
  	Given I have the following categories:
  	  | name   | description 					|
  	  | Energy | Federal energy policy datasets |
  	When I browse the market place by category "Energy"
  	Then I should see the description "Federal engergy policy datasets"

  Scenario: Category meta-data description
  	Given I have the following categories:
  	  | name   | description 					|
  	  | Energy | Federal energy policy datasets |
  	When I browse the market place by category "Energy"
  	Then I should see the description "Federal engergy policy datasets"

  Scenario: Category meta-data owner
  	Given I have the following categories:
  	  | name   | Owner |
  	  | Energy | Paul  |
  	When I browse the market place by category "Energy"
  	Then I should see the owner "Paul"
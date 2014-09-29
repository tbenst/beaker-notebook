Feature: Market Place Catalogs
As a researcher, I want to be able to browse different market place catalogs.

  Background:
    Given I'm signed in as a researcher
    And I have Two Sigma catalog
    And I have Quandl catalog

  Scenario: Default catalog
    Given I have the following market items:
      | title                  | vendor           | format  | tags         | categories |
      | Credit Card Complaints | Bank of America  | json    | bank,america | Two Sigma  |
    When I view the market search
    Then I should see the follwing filters:
    | filter | values          |
    | vendor | Bank of America |
    | format | json            |
    | tags   | america,bank    |
    And I should see 1 market item on the market list page

  Scenario: Browse different catalogs
    Given I have the following market items:
      | title                  | vendor           | format  | tags         | categories |
      | Credit Card Complaints | Bank of America  | json    | bank,america | Two Sigma  |
    And I have the following market items:
      | name              | company          | type    | categories |
      | Crime in Canada   | World Stats Inc. | xml     | Quandl     |
    When I view the market search
    And I browse "Quandl" catalog
    Then I should see the follwing filters:
    | filter  | values           |
    | company | World Stats Inc. |
    | type    | xml              |
    And I should see 1 market item on the market list page


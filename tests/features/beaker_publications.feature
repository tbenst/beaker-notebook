@flaky @unimplemented
Feature: Beaker Solo Publications
  As a Beaker Solo User
  I want to be able to publish notebooks
  So that I can share my data with others

  Scenario: Searching Beaker publications
    Given there are 12 Beaker publications
    And there is Beaker publication named "top secret"
    When I view the Beaker publications page
    And I search for publication "lorem ipsum"
    Then I should see 0 publication results on the page
    When I view the Beaker publications page
    And I search for publication "top secret"
    Then I should see 1 publication results on the page
    And I should be on page 1 of results
    And I should see the following publication first in the list:
      | name       |
      | top secret |

  @flaky
  Scenario: Searching Beaker publication in wildcard mode
    Given there are 12 Beaker publications
    And there is Beaker publication named "top secret"
    When I view the Beaker publications page
    And I search for publication "secre"
    Then I should see 1 publication results on the page
    And I should be on page 1 of results
    And I should see the following publication first in the list:
      | name       |
      | top secret |

  Scenario: Beaker publication categories
    Given I have the following Beaker publication categories:
      | name       | description             |
      | Politics   | Politics are political. |
    And there are 2 Beaker publications
    And there are 3 Beaker publications in the "Politics" category
    When I view the Beaker publications page
    Then I should see 5 publication results on the page
    When I click the "Politics" category
    Then The category should display the "Politics" icon
    And The category should have the description "Politics are political."
    Then I should see 3 publication results on the page
    And I should see the "Politics" icon in the first result
    When I click the "All" category
    Then I should see 5 publication results on the page
    Then I should see 3 publication results next to the "Politics" category

  Scenario: Viewing Beaker publications
    Given there is Beaker publication named "top secret"
    And I view the Beaker publication
    Then I should see the publication notebook

  Scenario: Minimizing publication sections
    Given there is Beaker publication named "top secret"
    And I view the Beaker publication
    Then I should be able to collapse and expand inputs
    And I should be able to collapse and expand outputs

  @flaky
  Scenario: Paginated publications
    Given I have the following Beaker publication categories:
      | name       | description             |
      | Politics   | Politics are political. |
    And there are 15 Beaker publications in the "Politics" category
    When I view the Beaker publications page
    Then I should see 10 publication results on the page
    And I should see 15 publication results next to the "Politics" category
    When I click page 2 of pagination
    Then I should see 5 publication results on the page

  Scenario: Rating a publication
    Given there is Beaker publication named "top secret"
    And I view the Beaker publication
    And I give the publication a rating of 3
    Then I should see 3 stars highlighted in my rate
    And I should see 3 stars highlighted in the average

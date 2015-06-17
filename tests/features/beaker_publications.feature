Feature: Beaker Solo Publications
  As a Beaker Solo User
  I want to be able to publish notebooks
  So that I can share my data with others

  Scenario: Beaker Publications List
    Given there are 5 publications
    When I view the Beaker publications page
    And I wait for publications to load
    Then I should see 5 publication results on the page

  Scenario: Viewing and downloading a publication
    Given there is a publication
    And I view the Beaker publications page
    And I wait for publications to load
    And I view the first publication
    Then I should see the publication notebook
    And I should see the author "john smith"
    And I should see the download link

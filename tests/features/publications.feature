Feature: Publications
  As a User
  I want to be able to publish notebooks
  So that I can share my data with others

  Background:
    Given I'm signed in as a researcher
    And I have the following Projects:
      | name               | description  |
      | ghost of tom jones | watch out    |
    And I have the following notebooks:
      | name               | projectName        |
      | top secret         | ghost of tom jones |

  Scenario: Publishing a Notebook
    Given I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then I should see that the notebook is not published
    When I go to publish the notebook
    And I give it the description "not so secret anymore"
    And I publish the notebook
    Then I should see that the notebook is published
    And the notebook publish date should be now
    When I view the published version
    Then I should see a published version of the following notebook:
      | name       | description           |
      | top secret | not so secret anymore |

  Scenario: Publications List
    Given there are 5 publications
    And I view my projects
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go to publish the notebook
    And I publish the notebook
    Then I should see that the notebook is published
    When I view the publications page
    Then I should see 6 publication results on the page
    And I should see the following publication first in the list:
      | name       |
      | top secret |

  Scenario: Deleting a Publication
    Given the notebook "top secret" is published
    And I view my projects
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I delete the publication
    Then I should see that the notebook is not published

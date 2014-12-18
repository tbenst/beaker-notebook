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
    And I have the following publication categories:
      | name       |
      | Finance    |

  Scenario: Viewing an open and published notebook
    Given I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    When I go to publish the notebook
    And I give it the description "not so secret anymore"
    And I give it the category "Finance"
    And I publish the notebook
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then the notebook cells should be visible

  Scenario: Publishing a Notebook
    Given I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then I should see that the notebook is not published
    When I go to publish the notebook
    And I give it the description "not so secret anymore"
    And I give it the category "Finance"
    And I publish the notebook
    Then I should see that the notebook is published
    And the notebook publish date should be now
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then the notebook cells should be visible
    When I view the published version
    Then I should see a published version of the following notebook:
      | name       | description           |
      | top secret | not so secret anymore |

  Scenario: Updating a Publication
    Given I have the following publication categories:
      | name       |
      | Finance    |
    And the notebook "top secret" is published
    When I view my projects
    And I open the "ghost of tom jones" project
    And I rename the "top secret" notebook to "top secrets"
    And I view the notebook "top secrets"
    And I go to update the publication
    And I give it the description "a new description"
    And I give it the category "Finance"
    And I update the publication
    Then the notebook updated time should be now
    When I view the published version
    Then I should see an updated version of the following notebook:
      | name        | description       | category |
      | top secrets | a new description | Finance  |

  Scenario: Publications List
    Given there are 5 publications
    And I view my projects
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go to publish the notebook
    And I give it the category "Finance"
    And I publish the notebook
    Then I should see that the notebook is published
    When I view the publications page
    Then I should see 6 publication results on the page
    And I should see the following publication first in the list:
      | name       | languages         |
      | top secret | Ht, Py, R, Gr, JS |

  Scenario: Author Info in publication list
    When I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go to publish the notebook
    And I give it the category "Finance"
    And I publish the notebook
    Then I should see that the notebook is published
    When I view the publications page
    Then I should see my author info in the first publication

  Scenario: Top Contributors List in Sidebar
    Given I have the following publication categories:
      | name       | description          |
      | Energy     | Energy is energetic. |
    And there are 3 publications in the "Energy" category
    When I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go to publish the notebook
    And I give it the category "Finance"
    And I publish the notebook
    Then I should see that the notebook is published
    When I view the publications page
    Then I should see the following top contributors:
      | name          | job_title  | company   | gravatar_email |
      | jon research  |            |           | jon@r.edu      |
      | joe research  | Researcher | Two Sigma | u@r.edu        |
    When I click the "Energy" category
    Then I should see the following top contributors:
      | name          | job_title  | company   | gravatar_email |
      | jon research  |            |           | jon@r.edu      |

  Scenario: Deleting a Publication
    Given the notebook "top secret" is published
    And I view my projects
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I delete the publication
    Then I should see that the notebook is not published

  Scenario: Copying a publication to Bunsen
    Given there is a publication named "top secret"
    And I view the publications page
    And I view the first publication
    When I go to open the publication in Bunsen
    And I select the destination project "ghost of tom jones"
    And I copy the publication
    Then I should see an error in the modal saying "That name is already taken by another notebook in that project"
    When I name the copied notebook "top secret 2"
    And I copy the publication
    Then I should be in the "top secret 2" notebook
    When I view my projects
    And I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name         |
      | top secret   |
      | top secret 2 |

  Scenario: Searching publications
    Given there are 2 publications
    And the notebook "top secret" is published
    When I view the publications page
    And I search for publication "lorem ipsum"
    Then I should see 0 publication results on the page
    When I view the publications page
    And I search for publication "top secret"
    Then I should see 1 publication results on the page
    And I should see the following publication first in the list:
      | name       |
      | top secret |

  Scenario: Publication categories
    Given I have the following publication categories:
      | name       | description             |
      | Politics   | Politics are political. |
    Given there are 2 publications for the project "random"
    And there are 3 publications in the "Politics" category
    When I view the publications page
    Then I should see 5 publication results on the page
    When I click the "Politics" category
    Then The category should display the "Politics" icon
    And The category should have the description "Politics are political."
    Then I should see 3 publication results on the page
    And I should see the "Politics" icon in the first result
    When I click the "All" category
    Then I should see 5 publication results on the page
    Then I should see 3 publication results next to the "Politics" category

  Scenario: Categorizing publications
    Given I have the following publication categories:
      | name       |
      | Energy     |
      | Finance    |
    Given I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    When I go to publish the notebook
    And I give it the category "Finance"
    And I publish the notebook
    Then I should see that the notebook is published
    When I view the publications page
    And I click the "Finance" category
    Then I should see the following publication first in the list:
      | name       |
      | top secret |
    When I click the "Energy" category
    Then I should see 0 publication results on the page

  Scenario: Viewing publications
    Given I have a publication
    When I view the publication
    Then I should see the publication notebook
    And I should see the author "joe research"
    And I should see the gravatar for "u@r.edu"
    And I should see the authors job title "Researcher"
    And I should see the authors company "Two Sigma"

  Scenario: Delete a publication from publication page
    Given I have a publication
    When I view the publication
    And I delete the publication from publication page
    Then I should see 0 publication results on the page

  Scenario: Minimizing publication sections
    Given I have a publication
    When I view the publication
    Then I should be able to collapse and expand inputs
    And I should be able to collapse and expand outputs

  Scenario: Publishing a Notebook with unsaved changes
    Given I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    When I edit the notebook
    And I go to publish the notebook
    Then I should see "Warning, your notebook has unsaved changes."

  Scenario: Paginated publications
    Given I have the following publication categories:
      | name       | description             |
      | Politics   | Politics are political. |
    And there are 15 publications in the "Politics" category
    When I view the publications page
    Then I should see 10 publication results on the page
    Then I should see 15 publication results next to the "Politics" category

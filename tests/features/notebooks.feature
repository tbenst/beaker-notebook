Feature: Use Notebooks
  Background:
    Given I'm signed in as a researcher
    And I have the following Projects:
      | name               | description  |
      | ghost of tom jones | watch out    |
    And I have the following notebooks:
      | name               | projectName        |
      | top secret         | ghost of tom jones |
      | powderpuff girls   | ghost of tom jones |
    And I view my projects

  Scenario: Notebooks Listing
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |

  Scenario: Recent Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    Then I should see the following recent notebooks:
      | name              |
      | powderpuff girls  |
      | top secret        |
    When I open the recent notebook "top secret"
    Then I should see the following recent notebooks:
      | name             |
      | top secret       |
      | powderpuff girls |

  Scenario: Open Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then I should see the following open notebooks:
      | name              |
      | top secret        |
    And I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    Then I should see the following open notebooks:
      | name              |
      | powderpuff girls  |
      | top secret        |

  Scenario: Renaming Notebook from Listing
    When I open the "ghost of tom jones" project
    And I rename the "powderpuff girls" notebook to "powerpuff girls"
    Then I should see the following notebooks:
      | name            |
      | powerpuff girls |
      | top secret      |

  Scenario: Deleting a Notebook
    Given I open the "ghost of tom jones" project
    And the "top secret" notebook is open
    When I delete the "top secret" notebook
    Then I should see the following notebooks:
      | name             |
      | powderpuff girls |
    And I should see 0 recent notebooks
    And I should see 0 open notebooks

  Scenario: Canceling Deleting a Notebook
    Given I open the "ghost of tom jones" project
    And I go to delete the "top secret" notebook
    When I cancel the dialog
    Then the modal should be closed
    And I should see the following notebooks:
      | name             |
      | powderpuff girls |
      | top secret       |

  Scenario: Close Rename Modal
    Given I open the "ghost of tom jones" project
    And I open the rename modal for "top secret"
    When I click the modal close button
    Then the modal should be closed

  Scenario: Renaming Notebook from Detail View
    Given I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    When I rename the notebook to "top secrete"
    Then I should be in the "top secrete" notebook

  Scenario: Renaming Notebook to Duplicate
    When I open the "ghost of tom jones" project
    And I rename the "powderpuff girls" notebook to "top secret"
    Then I should see an error in the modal saying "That name is taken by another notebook in this project."
    When I rename the notebook "powerpuff girls" instead
    Then the modal should be closed
    When I open the rename modal for "powerpuff girls"
    Then I shouldn't see an error in the modal

  Scenario: Closing the current notebook
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I close the notebook
    Then I should see the following open notebooks:
      | name              |

  Scenario: Closing a notebook from the open notebooks list
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    Then I should see the following open notebooks:
      | name             |
      | powderpuff girls |
      | top secret       |
    When I close the open notebook "top secret"
    Then I should see the following open notebooks:
      | name             |
      | powderpuff girls |
    When I close the open notebook "powderpuff girls"
    Then I should see the "ghost of tom jones" project detail page

  Scenario: Creating a Notebook
    When I open the "ghost of tom jones" project
    And I make a new notebook
    And I close the notebook
    Then I should see the following open notebooks:
      | name |
    Then I should see the following recent notebooks:
      | name        |
      | Notebook 1  |

  Scenario: Importing notebooks
    When I open the "ghost of tom jones" project
    And I import the notebook by uploading the "hello_world.bkr" file
    Then I should see the following notebooks:
      | name               |
      | hello_world        |
      | powderpuff girls   |
      | top secret         |

  Scenario: Importing an invalid notebook should show an error message
   When I open the "ghost of tom jones" project
   And I import the notebook by uploading the "doge.jpg" file
   Then I should see a notebook import error message

  Scenario: Moving a notebook between projects
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I view my projects
    When I open the "ghost of tom jones" project
    And I move the "top secret" notebook to the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
    When I open the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | top secret         |

  Scenario: Moving an already existing notebook
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I have the following notebooks:
      | name               | projectName        |
      | top secret         | Finance Research   |
    And I view my projects
    When I open the "ghost of tom jones" project
    And I move the "top secret" notebook to the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |
    And I should see the error: "A notebook named 'top secret' already exists in project 'Finance Research'"

  Scenario: Saving a new notebook as another name
    When I open the "ghost of tom jones" project
    And I make a new notebook
    And I save the notebook as "Winter Grasp"
    Then I should be in the "Winter Grasp" notebook
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name             |
      | Notebook 1       |
      | Winter Grasp     |
      | powderpuff girls |
      | top secret       |

  Scenario: Saving changes to an existing notebook
    When I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I save my changes to the notebook
    Then I should be in the "powderpuff girls" notebook


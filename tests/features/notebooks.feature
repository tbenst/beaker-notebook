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
    Then I should see the following notebooks
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
      | top secret        |
      | powderpuff girls  |

  Scenario: Closing Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I close the notebook
    Then I should see the following open notebooks:
      | name              |

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
    Then I should see the following notebooks
      | name               |
      | hello_world        |
      | powderpuff girls   |
      | top secret         |

  Scenario: Moving a notebook between projects
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I view my projects
    When I open the "ghost of tom jones" project
    And I move the "top secret" notebook to the "Finance Research" project
    Then I should see the following notebooks
      | name               |
      | powderpuff girls   |
    When I open the "Finance Research" project
    Then I should see the following notebooks
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
    Then I should see the following notebooks
      | name               |
      | powderpuff girls   |
      | top secret         |
    And I should see the error: "A notebook named 'top secret' already exists in project 'Finance Research'"

  Scenario: Saving a new notebook as another name
    When I open the "ghost of tom jones" project
    And I make a new notebook
    And I save the notebook as "Winter Grasp"
    Then I should see the following notebooks in the gutter:
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
    Then I should see the following notebooks in the gutter:
      | name             |
      | powderpuff girls |
      | top secret       |

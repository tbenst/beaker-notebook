Feature: Use Notebooks
  Background:
    Given I'm signed in as a researcher
    And I have the following Projects:
      | name               | description  | opened-at                     |
      | ghost of tom jones | watch out    | 2000-01-01T00:00:00.000+00:00 |
    And I have the following notebooks:
      | name               | projectName        | opened-at                     | open  |
      | top secret         | ghost of tom jones | 1990-01-01T00:00:00.000+00:00 | false |
      | powderpuff girls   | ghost of tom jones | 1991-01-01T00:00:00.000+00:00 | false |
    And I view my projects

  Scenario: Listing notebooks on project detail page.
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |

  @flaky
  Scenario: Recent Notebooks ordered with most recent on top
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I ensure the notebook is open
    Then I should see the following recent notebooks:
      | name              |
      | powderpuff girls  |
      | top secret        |
    When I open the recent notebook "top secret"
    Then I should see the following recent notebooks:
      | name             |
      | top secret       |
      | powderpuff girls |

  @flaky
  Scenario: Open Notebooks displayed in sidebar
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

  Scenario: Renaming notebook from project detail page
    When I open the "ghost of tom jones" project
    And I rename the "powderpuff girls" notebook to "powerpuff girls"
    Then I should see the following notebooks:
      | name            |
      | powerpuff girls |
      | top secret      |

  Scenario: Deleting a notebook from project detail page
    Given I open the "ghost of tom jones" project
    And the "top secret" notebook is open
    When I delete the "top secret" notebook
    Then I should see the following notebooks:
      | name             |
      | powderpuff girls |
    And I should see 1 recent notebooks
    And I should see 0 open notebooks

  Scenario: Canceling deleting a notebook
    Given I open the "ghost of tom jones" project
    And I go to delete the "top secret" notebook
    When I cancel the dialog
    Then the modal should be closed
    And I should see the following notebooks:
      | name             |
      | powderpuff girls |
      | top secret       |

  Scenario: Closing the rename rename modal
    Given I open the "ghost of tom jones" project
    And I open the rename modal for "top secret"
    When I click the modal close button
    Then the modal should be closed

  Scenario: Renaming a notebook from the Notebook view
    Given I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    When I rename the notebook to "top secrete"
    Then I should be in the "top secrete" notebook

  @flaky
  Scenario: Renaming a notebook to a conflicting name
    When I open the "ghost of tom jones" project
    And I rename the "powderpuff girls" notebook to "top secret"
    Then I should see an error in the modal saying "That name is taken by another notebook in this project."
    When I rename the notebook "powerpuff girls" instead
    Then the modal should be closed
    When I open the rename modal for "powerpuff girls"
    Then I shouldn't see an error in the modal

  Scenario: Closing the current notebook from the notebook detail page
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I close the notebook
    Then I should see the following open notebooks:
      | name              |

  Scenario: Closing a notebook from the open notebooks list
    Given I open the "ghost of tom jones" project
    And the "top secret" notebook is open
    And the "powderpuff girls" notebook is open
    When I close the open notebook "top secret"
    Then I should see the following open notebooks:
      | name             |
      | powderpuff girls |
    When I close the open notebook "powderpuff girls"
    Then I should see the "ghost of tom jones" project detail page

  @flaky @broken
  # broken because recent notebooks is broken.
  Scenario: Creating a Notebook
    When I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I ensure the notebook is open
    And I close the notebook
    And I make a new notebook
    And I ensure the notebook is open
    And I close the notebook
    Then I should see the following open notebooks:
      | name |
    Then I should see the following recent notebooks:
      | name             |
      | Notebook 1       |
      | powderpuff girls |
      | top secret       |

  Scenario: Importing a notebook
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
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |
    And I move the "top secret" notebook to the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
    When I open the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | top secret         |

  Scenario: Moving a notebook to a project with another notebook of the same name
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I have the following notebooks:
      | name               | projectName        |
      | top secret         | Finance Research   |
    And I view my projects
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |
    When I move the "top secret" notebook to the "Finance Research" project
    Then I should see the following notebooks:
      | name               |
      | powderpuff girls   |
      | top secret         |
    And I should see the error: "A notebook named 'top secret' already exists in project 'Finance Research'"

  @flaky
  Scenario: Saving a notebook as another name
    When I open the "ghost of tom jones" project
    And I make a new notebook
    And I ensure the notebook is open
    And I save the notebook as "Winter Grasp"
    Then I should be in the "Winter Grasp" notebook
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks:
      | name             |
      | Notebook 1       |
      | powderpuff girls |
      | top secret       |
      | Winter Grasp     |

  Scenario: Saving changes to an existing notebook
    When I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I save my changes to the notebook
    Then I should be in the "powderpuff girls" notebook

  Scenario: Deleting associated notebooks when deleting a project
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I view my projects
    And I open the "ghost of tom jones" project
    When I edit the project
    And I delete the project
    And I should see 0 recent notebooks
    And I should see 0 open notebooks

  Scenario: Combined Notebook and Project Search
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I have the following notebooks:
      | name              | projectName      |
      | Data preparation  | Finance Research |
      | Hadoop map-reduce | Finance Research |
    When I view my projects
    And I search for notebook "Data preparation"
    Then I should see the following search results
      | name                        |
      | Notebook: Data preparation  |
      | Project: Finance Research   |

  @flaky
  Scenario: Open last used notebook when returning to the projects tab
    When I open the "ghost of tom jones" project
    And I see the project detail page
    And I view the notebook "powderpuff girls"
    And I view my projects
    And I ensure the notebook is open
    Then I should be in the "powderpuff girls" notebook

  @flaky @broken
  #broken because recent notebooks is broken.
  Scenario: Reopening notebooks from the recent notebooks list
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I view my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I ensure the notebook is open
    And I see the following recent notebooks:
      | name              |
      | powderpuff girls  |
      | top secret        |
    When I open the recent notebook "top secret"
    Then I should be in the "top secret" notebook
    When I open the recent notebook "powderpuff girls"
    Then I should be in the "powderpuff girls" notebook

  Scenario: Leaving a notebook open when browsing away from Projects tab
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I wait for the notebook to load
    And I navigate away from the projects tab
    Then my notebook should remain open in the background

  Scenario: Highlight the current notebook in the open notebooks list
    And I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then the "top secret" notebook should be active

  Scenario: Viewing current project's project page
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go back to the current notebook's project
    Then I should see the "ghost of tom jones" project detail page

  Scenario: Fullscreen view for notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I toggle fullscreen mode
    Then the notebook should be in fullscreen
    When I go back to the current notebook's project
    And I view the notebook "powderpuff girls"
    Then the notebook should still be in fullscreen
    When I toggle fullscreen mode
    Then I should see the project and notebook options

  Scenario: Evaluating code in a notebook cell
    When I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "1+1" in the first cell
    Then I should see "2" in the first cell output

  Scenario: Saving and Closing an edited notebook
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "1 + 1" in the first cell
    And I close the notebook
    Then Beaker should ask me "Do you want to save powderpuff girls?"
    When I click save and close
    Then the Beaker dialog should be closed
    And I should see the "ghost of tom jones" project detail page
    When I view the notebook "powderpuff girls"
    Then I should see "2" in the first cell output

  Scenario: Closing an edited notebook without saving
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "1 + 1" in the first cell
    Then I should see "2" in the first cell output
    When I save my changes to the notebook
    And I run "2 + 2" in the first cell
    Then I should see "4" in the first cell output
    When I close the notebook
    Then Beaker should ask me "Do you want to save powderpuff girls?"
    When I click close without saving
    Then the Beaker dialog should be closed
    And I should see the "ghost of tom jones" project detail page
    When I view the notebook "powderpuff girls"
    Then I should see "2" in the first cell output

  Scenario: Cancelling closing an unsaved notebook
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "1 + 1" in the first cell
    And I close the notebook
    Then Beaker should ask me "Do you want to save powderpuff girls?"
    When I click cancel
    Then the Beaker dialog should be closed
    And I should be in the "powderpuff girls" notebook

  Scenario: Preserving session state when switching notebooks
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "9 / 3" in the first cell
    Then I should see "3" in the first cell output
    And I open the "ghost of tom jones" project
    When I view the notebook "top secret"
    And I ensure the notebook is open
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I ensure the notebook is open
    Then I should see "3" in the first cell output

  Scenario: Each notebook should have its own private language kernels
    When I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "a=33; a" in the first cell
    Then I should see "33" in the first cell output
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I run "a" in the first cell
    Then I should see "+name 'a' is not defined" in the first cell output
    When I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    And I run "a" in the first cell
    Then I should see "33" in the first cell output

  @flaky
  Scenario: Unavailable notebook
    Given my "powderpuff girls" notebook is unavailable
    When I open the "ghost of tom jones" project
    Then I should see a warning in the "powderpuff girls" notebook
    And I view the notebook "powderpuff girls"
    Then I should see the "ghost of tom jones" project detail page
    When I navigate directly to the unavailable notebook
    Then I should see the "ghost of tom jones" project detail page

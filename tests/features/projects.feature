Feature: Manage Projects
As a researcher, I want to manage my projects.

  Background:
    Given I'm signed in as a researcher

  Scenario: Create a project
    When I create a project
    Then I should see a new project in my list
    When I open the project
    Then I should see the project detail page

  Scenario: Edit a project
    Given I'm looking at a project
    When I edit the project
    And I update the project as follows:
      | name            | description          |
      | Science Project | For the Science Fair |
    Then I should see that the project details are:
      | name            | description          |
      | Science Project | For the Science Fair |

  Scenario: Prevent duplicate project names
    When I create a project
    And I create a project
    And I open the project
    And I edit the project
    And I update the project as follows:
      | name      |
      | Project 2 |
    Then I should be warned that the project is a duplicate name
    And I should see the following project list:
      | name      |
      | Project 1 |
      | Project 2  |
      | Sandbox   |
    When I update the project as follows:
      | name      |
      | Safe name |
    Then I should see the following project list:
      | name      |
      | Project 2 |
      | Safe name |
      | Sandbox   |

  Scenario: Dismiss/rewarn duplicate project name error
    When I create a project
    And I create a project
    And I open the project
    And I edit the project
    And I update the project as follows:
      | name      |
      | Project 2 |
    Then I should be warned that the project is a duplicate name
    When I dismiss the duplicate project name error message
    Then I should not see the project duplicate warning
    When I update the project as follows:
      | name      |
      | Project 2 |
    Then I should be warned that the project is a duplicate name

  Scenario: Project edits are reflected in the sidebar
    Given I'm looking at a project
    When I edit the project
    And I update the project as follows:
      | name          | description          |
      | Led Zeppelin  | For the Science Fair |
    Then I should see the following project list:
      | name          |
      | Led Zeppelin  |
      | Sandbox       |

  Scenario: Delete a project
    Given I'm looking at a project
    When I edit the project
    And I delete the project
    Then I should see that I have one project in my list

  Scenario: Cancel Deleting a project
    Given I'm looking at a project
    When I edit the project
    And I go to delete the project
    And I cancel deleting the project
    Then I should still be on the project page

  Scenario: Empty Project Dashboard Searching
    Given I search for project "ghost of tom jones"
    Then I should see 0 project results.

  Scenario: Project list ordering
    Given I have the following Projects:
      | name      | description   |
      | project c | lorem ipsum c |
      | project b | lorem ipsum b |
      | project a | lorem ipsum a |
    When I view my projects
    And I open the "project b" project
    And I make a new notebook
    And I close the notebook
    Then I should see the following project list in the sidebar:
      | name      |
      | project a |
      | project b |
      | project c |
      | Sandbox   |

  Scenario: Project Dashboard Searching
    Given I have the following Projects:
      | name               | description            |
      | ghost of tom jones | watch out              |
      | bobby jean         | ghost of tom jones     |
      | rage               | againt the machine     |
    And I view my projects
    And I search for project "ghost of tom jones"
    Then I should see 2 project results.

  Scenario: Project Dashboard ReSearching
    Given I have the following Projects:
      | name               | description            |
      | ghost of tom jones | watch out              |
      | bobby jean         | ghost of tom jones     |
      | rage               | againt the machine     |
    And I view my projects
    And I search for project "ghost of tom jones"
    And I view the first search result
    And I search for project "rage"
    Then I should see 1 project results.

  Scenario: Project Search Metadata
    Given I have the following Projects:
      | name             | description                          |
      | Finance Research | Researching a theory on stock prices |
    And I have the following notebooks:
      | name              | projectName      |
      | Data preparation  | Finance Research |
      | Hadoop map-reduce | Finance Research |
    When I view my projects
    And I search for project "finance"
    Then I should see the following project results
      | name              | notebooks |
      | Finance Research  | 2         |

  Scenario: Open last project
    Given I have the following Projects:
      | name     | description               |
      | hello rb | hello world in ruby       |
      | hello js | hello world in javascript |
    And I view my projects
    When I open the "hello js" project
    And I go to my projects
    Then I should see the "hello js" project detail page

  Scenario: Open last created project by default
    Given I have the following Projects:
      | name     | description               |
      | hello js | hello world in javascript |
      | hello rb | hello world in ruby       |
    When I go to my projects
    Then I should see the "hello rb" project detail page

  Scenario: Open projects after deleting last visited
    Given I have the following Projects:
      | name     | description               |
      | hello rb | hello world in ruby       |
      | hello js | hello world in javascript |
    And I view my projects
    And I open the "hello js" project
    When I delete the project
    Then I should see the "hello rb" project detail page

  Scenario: Project Description
    Given I have the following Projects:
      | name     | description               |
      | hello js | hello world in javascript |
    And I view my projects
    And I open the "hello js" project
    Then I should see the description "hello world in javascript"

  Scenario: Project updated date
    Given I have the following Projects:
      | name              | description                          | updated_at                |
      | Finance Research  | Researching a theory on stock prices | 2014-04-29 09:45:18.697   |
    And I view my projects
    And I open the "Finance Research" project
    And I edit the project
    And I update the project as follows:
      | description                               |
      | Researching a new theory on stock prices  |
    Then I should see last updated as today's date

  Scenario: Recently Used Notebooks
    Given I have the following Projects:
      | name              | description                          | updated_at                |
      | Finance Research  | Researching a theory on stock prices | 2014-04-29 09:45:18.697   |
    And I have the following notebooks:
      | name              | projectName      | openedAt                |
      | Data preparation  | Finance Research | 2014-04-29 09:45:18.697 |
      | Hadoop map-reduce | Finance Research | 2014-04-30 09:45:18.697 |
    And I view my projects
    When I open the "Finance Research" project
    Then I should see the following recently used notebooks:
      | name              |
      | Hadoop map-reduce |
      | Data preparation  |
    When I view the notebook "Data preparation"
    And I close the notebook
    Then I should see the following recently used notebooks:
      | name              |
      | Data preparation  |
      | Hadoop map-reduce |

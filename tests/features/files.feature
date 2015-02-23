Feature: Upload and Manage Files
As a researcher, I want to be able to upload files to my scratch space
so that I can use files within my cells that I might not want shared on the internet.

  Background:
    Given I'm signed in as a researcher
    And my scratchspace is empty

  Scenario: Viewing my uploaded files
    When I view my files
    Then I should see my file list

  Scenario: Uploading files
    When I upload a file
    And I view my files
    Then I should see 1 uploaded file

  Scenario: Viewing file sizes
    When I upload a file
    And I view my files
    Then I should see the uploaded file is 21.07 KB

  Scenario: Deleting files
    When I upload a file
    And I view my files
    Then I should see 1 uploaded files
    When I select the file "doge.jpg"
    And I delete the selected files
    When I click yes to confirm deletion
    Then I should see 0 uploaded files

  Scenario: Displaying disk usage
    When I upload a file
    Then I should see I have 78.93 KB of free disk space

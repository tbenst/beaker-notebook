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
    Then I should see uploaded files

  Scenario: Viewing file sizes
    When I upload a file
    And I view my files
    Then I should see the uploaded file is 21.07 KB

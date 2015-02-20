Feature: Subscriptions
  As a researcher
  I want to see my subscriptions
  So that I can use them quickly and easily.

  Background:
    Given I'm signed in as a researcher
    And I have a default catalog
    And I'm subscribed to the following market items:
      | title               | remoteFile | description  |
      | Crime Rates, Canada | CRIME.xml  | pretty bad   |
      | Population, Canada  | POP.xml    | somewhat low |

  Scenario: Seeing overview
    When I view My Datasets
    Then I should see that I have 2 datasets in the overview
    And I should see a total cost of $0 in the overview
    And I should see the following subscriptions in the overview:
      | title               | remoteFile | description  |
      | Population, Canada  | POP.xml    | somewhat low |
      | Crime Rates, Canada | CRIME.xml  | pretty bad   |

  Scenario: Seeing subscribed datasets
    When I view My Datasets
    Then I should see the following subscriptions:
      | title               | remoteFile | description  |
      | Crime Rates, Canada | /var/s3/CRIME.xml  | pretty bad   |
      | Population, Canada  | /var/s3/POP.xml    | somewhat low |

  Scenario: Viewing dataset details
    When I view My Datasets
    And I view the "Crime Rates, Canada" dataset
    Then I should see the "Crime Rates, Canada" dataset in the marketplace
    And I should be able to unsubscribe

  Scenario: Returning to marketplace from my dataset details
    When I view My Datasets
    And I view the "Crime Rates, Canada" dataset
    And I view the market search
    Then I should see the "Crime Rates, Canada" market item on the market list page

  Scenario: Returning to subscription list from detail view
    When I view My Datasets
    And I view the "Crime Rates, Canada" dataset
    And I return to the list from the market item
    Then I should see the following subscriptions:
      | title               | remoteFile | description  |
      | Crime Rates, Canada | /var/s3/CRIME.xml  | pretty bad   |
      | Population, Canada  | /var/s3/POP.xml    | somewhat low |

  Scenario: Seeing subscription date
    Given I have the following market items:
      | title            | remoteFile |
      | Employment Rates | MONEYS.csv |
    When I view My Datasets
    And I view the market search
    And I view the "Employment Rates" market item
    And I subscribe to the market item
    And I view My Datasets
    Then I should see the current date for subscription date for "Employment Rates" market item

  Scenario: Searching datasets
    When I view My Datasets
    And I search my subscriptions for "Crime Rates"
    Then I should see the following subscriptions:
      | title               | remoteFile         | description  |
      | Crime Rates, Canada | /var/s3/CRIME.xml  | pretty bad   |

  Scenario: Sorting datasets by subscription date
    Given I have the following market items:
      | title            | remoteFile | description |
      | Employment Rates | MONEYS.csv | some        |
    When I view My Datasets
    When I view the market search
    And I view the "Employment Rates" market item
    And I subscribe to the market item
    And I view My Datasets
    And I sort by subscription date
    Then I should see the following subscriptions:
      | title               | remoteFile | description  |
      | Employment Rates    | /var/s3/MONEYS.csv | some         |
      | Population, Canada  | /var/s3/POP.xml    | somewhat low |
      | Crime Rates, Canada | /var/s3/CRIME.xml  | pretty bad   |
    When I unsort by subscription date
    Then I should see the following subscriptions:
      | title               | remoteFile | description  |
      | Crime Rates, Canada | /var/s3/CRIME.xml  | pretty bad   |
      | Employment Rates    | /var/s3/MONEYS.csv | some         |
      | Population, Canada  | /var/s3/POP.xml    | somewhat low |

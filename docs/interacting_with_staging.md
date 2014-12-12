### Connect to staging

  * kinit
  * First connect to the staging box via <username>@build.withmojo.com
    * If you recieve a connection closed message you do not have an account on the server, ask will@mojotech.com for one.

### Connecting to the staging postgres database

> Values are stored within config/staging.jq

* `psql -h <EXTERNAL_DB_HOST> -U <EXTERNAL_DB_USER> -d <EXTERNAL_DB_NAME>`

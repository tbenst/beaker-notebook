# Beaker Bootstrap sequence #

Here are the steps that Beaker goes through when it starts up.

###  1. Static JavaScript files loads

All static javascript source files (around 120) are loaded in main layout html
(as with any web application).

### 2. beaker.js kicks off the rest of the bootstrap

beaker.js is the "main function" of beaker.  It kicks of the beaker-specific
initialization sequence.

### 3. Load "initialization plugins" ###

1. Make a request to the server to load the list of "init plugins".
    * /beaker/rest/util/getInitPlugins
    * [ "./plugin/init/track.js", "./plugin/init/addevalplugins.js" ]
    * These come from beaker.conf.json on the server.  There's a way for this to
      be merged with user preferences but Bunsen doesn't support that.
2. Load each of the init plugins
    * track.js is for Google Analytics
    * addevalplugins initializes a global map of server-side plugins
      (window.bkInit.getEvaluatorUrlMap), keys are plugin names e.g. Ipython,
      values are javascript url's
      ("./plugins/eval/ipythonPlugins/ipython/ipython.js")
    * The initialization plugins are actually javascript files that determine
      their own initialization steps using their own code.  Beaker wouldn't be
      able to run without the steps defined in these initialization plugins
      though.


### Create Beaker angular modules and register them with Angular. ###

1.  This is where root angular module 'beaker' is created.
    * routes are set up
        * /session/new  for creating a new document from default template
        * /session/empty for creating a new completely empty document
        * /session/:id for reattaching to an existing sesison
        * /open for opening an existing document from a URL.  After retrieving
          the document a session will be created and you'll be redirected to
          /sesssion/:id
        * /edit/:id (OUR ADDITION) for opening a document by ID. After retrieving
          the document a session will be created and you'll be redirected to
          /sesssion/:id
        * /control for going to the main dashboard (unused)
        * otherwise redirects to dashboard
    * access to recent Menu intialized.
    ../beaker/rest/recent-menu/
        * addItem
        * getItems
        * clear
    recentmenu.js is loaded here, which defines functions that manipulate the
    recent menu based on the menu API exposed by the Beaker server..
    * bkShareProvider is set up (allowing sharing, which we don't support)
    * bkTrackProvider is set up allowing GA tracking
    * the angular run block is registered (but not executed until the Angular bootstrap
    process is kicked off later on).
    
### Finally, actually kick of Angular bootstrap process ###

In addition to Angular's own "launch sequence", the run block defined above will
be executed now.
The run block will do these things:

* bkCoreManager.init
    * /beaker/rest/file-io/getDecoratedChildren
    * Allows interaction with local files for upload/download .... not
      useful for bunsen since server filesystem isnt' accessible to client.
* ../beaker/rest/util/whoami
    * Run asynchronously with delay of 1 second
    * For bunsen, response is always "beaker"
    * We don't need it
* Set up universal language plugins
    * Hardcoded ones are only Html, Latex, JavaScript 
    * (client js for other languages will be dynamically loaded later on
    when it's determined that the active notebook uses these languages).
    * add to global plugin registry map
* ../beaker/rest/util/getVersionInfo
    * stores version and buildTime
    * helps beaker decides what to do with older format .bkr files

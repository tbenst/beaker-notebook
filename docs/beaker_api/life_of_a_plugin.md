# Life of a plugin #

This describes the lifecycle of an evaluation language plugin within a Beaker
editing session.  We'll use IPython as an example.

Note that a similar process to the one described here occurs once for each
evaluation plugin in a notebook.  So, if the notebook has 3 languages in it, 3
services will be started up on the server, 3 websockets connections will be
created to connect to them, etc.


## Discovery  ##

* The plugin's existence is discovered by being mentioned in
/plugin/init/addevalplugins.js during the bootstrap sequence.
* It is present in this file because IPython is mentioned it's in a server
configuration file, beaker.conf.json.
* The plugin is registered by name ("ipython" with bk.evaluatePluginManager),
  which is a Factory for instances of a plugin.

## Initialization ##

0. The main source file of the plugin is then loaded, which kicks off the
  initialization process specific to this plugin.
0. The client requests /beaker/rest/plugin-services/getIPythonVersion
0. THe server detects that Ipython v2 is installed and responds as such
0. The client decides to load the various source files it already knows are
associated with ipython2 (these are vendor files, part of the ipython project)
0. The client tells the server to start an Ipython process. Client tells the
server various things:
     *  command - name of the starting script
     *  nginxRules - rules to help setup nginx proxying (this is actually a name
        indicating a set of predefined rules known by the server, rather than
        the full content of the nginx rules0
     *  startedIndicator - string indicating that the plugin has started
     *  startedIndicatorStream - stream to search for indicator, null defaults to stdout
     *  recordOutput - boolean, record out/err streams to output log service or not, null defaults to false
     *  waitfor - if record output log service is used, string to wait for
     before logging starts
0. The server starts up ipython with the specified parameters, and assigns it a
  a url with a randomly generated portion.
0. The server modifies nginx config based on the client's suggestions, and also
  protects the url with a new randomly generated password
0. Server restarts nginx
0. Server returns the url by which the client should try to connect to the new
ipython service
0. The client requests /beaker/rest/plugin-services/getIPythonPassword.
0. The server returns the randomly generated password it applied to nginx config earlier
0. The client posts the password back to the newly accessible IPython path,
  via "/login", e.g. "/ipython.652445265041/login".  This is handled by the
  IPython server there (forwarded via new nginx config).
0. The vendor ipython client js takes over and iniates an iPython session
    * issues a GET to e.g. "/ipython.652445265041/api/sessions"
    * ipython responds with a kernel ID, which the client remembers, and a fake
      notebook name and fake notebook path (discarded by beaker)
    * ipython initiates a get request to
    eg. "wss://bunsen-staging.withmojo.com/beaker/29/ipython.652445265041/api/kernels/cbc7270e-6f8a-4f11-9b6b-885003f04bcf/shell"

## Code execution

* When the "Run" button in a code cell is clicked, we want to evaluate the code
on the server and display its output in the output cell below the code cell.
* There is some purely client side interplay in order to compose the evaluation
request:
    * helper.js presents the public api called by angular controller
    * evaluatejobmanager.js manages the queue of evaluate requests
    * evaluatormanager provides access to the plugin code e.g. iPython plugin
    * Beaker's ipython.js formulates request for ipython vendor client js
* iPython project's client JS is what actually sends packets to the iPython server and
interprets the response
* All this is either a part of the iPython project's API, or parts of Beaker
  that we wouldn't consider a part of the API between client and server.
* The communication between the client and server here utilizes iPython 2.3's
  wire protocol.  For detailed documentation, check [here](http://ipython.org/ipython-doc/2/development/messaging.html).

## Auto complete

* Autocompletion is also a function provided by the iPython wire protocol.
* See "Code execution" above; Beaker wraps iPython project's functionality in
  exactly the same way.  Beaker provides the glue between a particular Beaker
  cell and a particular iPython kernel.

## Reconnecting

* If the websocket connection to the iPython server is terminated (perhaps by
  virtue of the internet having been lost), beaker will periodically attempt to
  reconnect all language plugins to the server until everything is
  re-established.
* In the case of iPython, it calls the "restart" function of
appropriate ipython client side kernel stub.

## Shutting down

* The ipython websocket remains open (potentially with some restart()s, see
Reconnecting above) until the user closes the notebook.
* At that point, the exit() method of all plugins is called.
* Beaker's python plugin implements the exit method by simply calling the
"kill" function on the iPython client kernel stub.
    * iPython closes the websocket
    * iPython issues a  DELETE http request to the iPython server (e.g. /ipython.652445265041/api/kernels/kill/cbc7270e-6f8a-4f11-9b6b-885003f04bcf)
    * iPython server actually shuts down the spawned iPython process ("kernel")

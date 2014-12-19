# Life of a plugin #

(Compare to: [current version](../life_of_a_plugin.md))

This describes the lifecycle of an evaluation language plugin within a Beaker
editing session.  We'll use IPython as an example.

Note that a similar process to the one described here occurs once for each
evaluation plugin in a notebook.  So, if the notebook has 3 languages in it, 3
services will be started up on the server, 3 websockets connections will be
created to connect to them, etc.


## Discovery  ##

* The plugin's existence is exposed to Bunsen for all users and is
included in the main page's javascript files.
* The plugin is registered by name ("ipython" with bk.evaluatePluginManager),
  which is a Factory for instances of a plugin.

## Initialization ##

0. The client code for iPython (including vendor files) is loaded when someone first opens the Beaker UI.
0. Only client code for the single currently supported version of iPython is included.
0. client tells the server to start an Ipython process.  Client tells the
server:
     *  id of notebook
0. The server starts up ipython
0. The vendor ipython client js takes over and iniates an iPython session
    * issues a GET to a path, incorporating the notebook ID, e.g.: "/ipython/api/sessions/29"
    * iPython responds with a kernel ID, which will be the same as the ID
      requested in the URL, a fake notebook name and fake notebook path (discarded by beaker)
    * ipython initiates a get request to
    eg. "wss://bunsen-staging.withmojo.com/beaker/229/ipython/api/kernels/29/shell"

## Code execution

* For now, we don't want to change the client-server communication that occurs
  when executing code.  The websocket is open; we send messages across it in
  order to utilize the iPython wire protocol.  See [../life_of_a_plugin.md](current version).

* The communication between the client and server here utilizes iPython 2.3's
  wire protocol.  For detailed documentation, check [here](http://ipython.org/ipython-doc/2/development/messaging.html).

## Auto complete

* For now, we don't want to change the client-server communication that occurs
  when auto-completing.  The websocket is open; we send messages across it in
  order to utilize the iPython wire protocol.
* See [current version](../life_of_a_plugin.md).

## Reconnecting

* See [current version](../life_of_a_plugin.md).
* For now, no changes.

## Shutting down

* See [current version](../life_of_a_plugin.md).
* Only the URL of the DELETE request would be changed.  An example of the new
  URL style: /ipython/api/kernels/kill/29

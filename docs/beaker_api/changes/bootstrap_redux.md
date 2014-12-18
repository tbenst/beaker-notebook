# Beaker Bootstrap sequence simplified for Bunsen #

(Compare to: [current version](../bootstrap.md))

Here are the steps that Beaker goes through when it starts up.

###  0. Static JavaScript files loaded in advance

Beaker-related javascript files are loaded along with the main Bunsen UI when a
user logs in to Bunsen.  These are likely to be all combined into ONE file
(alongside the Bunsen source script files) from the
perspective of the browser, even though the source code is divided into a couple
of hundred files for developers to edit.

This includes
* the contents of beaker.js, beaker's "main method"
* each supported evaluator plugin (e.g
"./plugins/eval/ipythonPlugins/ipython/ipython.js")
* Vendor javascript files for each supported plugin (e.g. the iPython project's
client code)

### Fetch notebook contents from the Bunsen server

* An AJAX GET request is made to e.g. /notebooks/29/contents

### Initialize notebook UI with notebook contents

* bk-main-app UI element is attached to its controller and Angular takes over
  from there.  (This is no longer a part of the API between the client and the
  server).


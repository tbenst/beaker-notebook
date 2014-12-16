# How Bunsen uses the Beaker API #

By "API", here we mean the API between the beaker client javascript code and the
beaker server.  These documents don't stick strictly to requests between those
two parties, but that's the main focus.

* [Beaker initialization and bootstrap](bootstrap.md) Describes the steps beaker goes
  through in order to get itself up and running.
* [Lifecycle of a plugin](life_of_a_plugin.md) Using iPython as the example,
  describes the API's that a language plugin uses.
* [Sessions](sessions.md) The details of how Beaker ensures that users can
  re-connect to their work.
* [Enumeration of all Beaker REST API endpoints](endpoints_enumerated.md). For
each endpoint, provides
    * client js file that accesses it
    * url
    * http method
    * sample params
    * sample response
    * purpose
    * whether bunsen uses it, and if so, whether the way it currently works is
    good for bunsen. Visible only if you look at the [raw html version](endpoints_enumerated.html) in a browser (github UI
    will not show it)

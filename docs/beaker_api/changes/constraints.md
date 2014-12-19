# Design constraints for desktop beaker

Here are some of the constraints which influence the design of the API for
the desktop version of Beaker.

## Beaker will be installed on various types of desktop systems.

* It will need to utilize software that is already installed on those
systems.
* For example, the host system might have any version of iPython installed.
* The researcher might be invested in the specific version of iPython he
already has installed, so it wouldn't be desirable to install a different
version and force him to use that different version when running Beaker.
* Thus, beaker needs to support running with different versions of its own
dependencies.
* The drawback to this is code complexity; both in terms of the API and the
implementation.
* The client javascript code, because it runs inside a web browser, doesn't
  have permissions to directly examine the host OS.
* So the API is used for the part of the client code to ask the server about the
  dependencies, and to conditionally load additional client code based on
  the results.
* Furthermore, beaker ships with separate code that deals with various
types of host configuration.

## Client's talks to server via a local connection

* The common case is for desktop beaker to be run on one's own workstation.
* Latency will be zero; download time for code files will be close to zero
* It's not worthwhile to attempt to minimize the number and sequential dependecy
  of different source files, since on a local server, this won't make much
  difference in terms of load time.

## Researchers are encouraged to add their own plugins

* Beaker has defined a plugin API for code evaluators, menu behavior, etc
* The api is designed to be able to incorporate plugins created by the
  researcher himself or otherwise not included in the main Beaker distribution
* These plugins can add addional programming languages, or initiate new types of
interactions
* Via the plugin API, new capabilities can be added without altering or even
learning the core Beaker source code.
* The costs for this capability includes complexity (especially regarding
Beaker's initialization sequence)  and efficiency (not knowing in advance
exactly what code is going to be needed to run the person's notebook prevents
planning how to load that code in the fastest way).


## The client filesystem and the server filesystem are the same

* It makes sense to e.g. build intelligent file browser for files on the user's
  workstation, because although the browser prevents client javascript code from
  accessing the filesystem, the server (also living on the same filesystem) can
  do it and return the info to the client via an API.


## Each researcher maintains his own server environment

* If you're using the Beaker UI, you probably installed
  the server on the same computer.
* No one person has to worry about maintaining multiple versions of dependencies
  (e.g. languages) in order to "please everyone"; each researcher simply
  installs what is needed on the computer that runs Beaker.
* There is little disadvantage to allowing the client javascript code to
directly control the behavior of server processes like nginx.
* There is less of a reason to maintain clean separation of concerns between the
frontend and the backend; it's all running on the same computer!


# How do these change for Bunsen-Beaker?

Short answer:  none of these constraints apply to
Beaker-in-Bunsen. Item-by-item:

* Beaker will only be served from cloud instances provisioned and maintained by TwoSigma.
* Most commonly, the client will talk to the server over the internet.
* As a true hosted application, it would be much more difficult to allow researchers to inject their own plugins.
* The server will be running on a different filesystem from the client.
* Researchers will not be primarily responsible for maintaining the servers.

Thus, it makes sense that Beaker-in-Bunsen's behavior will diverge
from desktop Beaker when one of the factors on this page influences an architectural
decision.

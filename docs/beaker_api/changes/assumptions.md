# Assumptions we're making about design constraints for Bunsen-Beaker

This is best read after having read about some of the
[design constraints](constraints.md) for desktop Beaker.

* Bunsen won't need to support more than one version at a time of any given plugin.
  For example, we won't need to simultaneously offer Beaker instances that come
  with iPython version 2.3 and Beaker instances that come with iPython version
  3.0.
* A researcher never needs to run more than 1 set of server processes (plugin
"kernels") for the same notebook at the same time.
* We won't try to build a way for researchers to inject their own plugins into
the hosted Beaker instances.
* For the foreseeable future, we won't support more than a handful of code evaluator
plugins
* If Bunsen supports usage tracking, it won't be using Google Analytics
  in the same way that Desktop Beaker does it (and users won't be able to opt
  out of it).




# Proposed Changes to Beaker API for Bunsen

As we plan a tighter integration between Beaker and Bunsen, we should consider
changing the Beaker API in certain ways that will make it work better within the
constraints of Bunsen.

* [Design Constraints specific to desktop Beaker](constraints.md) Explains some
  of the design constraints of Desktop Beaker and explores whether each
  constraint still applied to Beaker-within-Bunsen.
* [Assumptions of this proposal](assumptions.md) Some conclusions and
  assumptions which guide the specific changes in this proposal.
* [Revised Beaker UI bootstrap process](bootstrap_redux.md) How we propose that
  a Beaker notebook should be initalized within the Bunsen UI.
* [Revised Beaker evaluator plugin lifecycle](life_of_a_plugin_redux.md) How we
  propose that Bunsen should manage the lifecycle of Beaker plugins.
* [Revised Beaker session management](sessions_redux.md) How we propose that
  Beaker session management should work in Bunsen.
* [Revised annotated list of Beaker REST API endpoints](endpoints_redux.md) Each
  endpoint that we propose Beaker server instances should expose.

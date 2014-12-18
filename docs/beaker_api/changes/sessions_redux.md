# Sessions in Beaker (revised)

(Compare to: [current version](../sessions.md))

Beaker remembers the state of the notebook to a certain extent even if the user
doesn't formally save changes.  This is done via "sessions".

## Backing up

Bunsen's version of beaker backs up the session whenever:

* A minute elapses since last backup (and beaker UI is still open)

When the session is backed up, it's stored on a file in the server's
filesystem.  This means that for Bunsen's current implementation of Beaker:

* Sessions are usable across computers - so if I make a change on my laptop,
  don't save, and open the same notebook on my desktop computer, I will still
  see my edited changes
* the sessions will be removed if a new beaker instance is provisioned.

## Backup contents

Backups contains the entire contents of the notebook's cells (everything that
would be in the .bkr file if the notebook were saved).

We don't need to worry about backing up evaluator information anymore, since
the urls of evaluators are now deterministic given the notebook ID and plugin name.


## Example session backup

    {
    "beaker": "2",
    "cells": [
        {
            "id": "section001",
            "type": "section",
            "level": 1,
            "title": "Hello Beaker",
            "collapsed": false,
            "evaluatorReader": false
        },
        {
            "id": "code001",
            "type": "code",
            "evaluator": "IPython",
            "input": {
                "body": "import commands\ncommands.getstatusoutput('ps aux | grep python | wc -l')"
            },
            "output": {
                "selectedType": "BeakerDisplay",
                "state": {},
                "result": {
                    "type": "BeakerDisplay",
                    "innertype": "Html",
                    "object": "<div class=\"out_prompt_overlay prompt\" title=\"click to expand output; double click to hide output\" style=\"display: none;\"></div><div class=\"output\" style=\"display: none;\"></div><div class=\"btn output_collapsed\" title=\"click to expand output\" style=\"display: none;\">. . .</div><div class=\"output_subarea output_text\"><pre>(0, '6')</pre></div>"
                },
                "outputArrived": true,
                "elapsedTime": 336
            },
            "evaluatorReader": false,
            "lineCount": 2
        },
        {
            "id": "codeZhXco4",
            "type": "code",
            "evaluator": "Node",
            "input": {
                "body": "// Node.js"
            },
            "output": {
                "selectedType": "BeakerDisplay",
                "state": {},
                "result": {
                    "type": "BeakerDisplay",
                    "innertype": "Error",
                    "object": "Evaluation cancelled due to a failure of an earlier cell evaluation"
                }
            },
            "evaluatorReader": true,
            "lineCount": 1
        },
        {
            "id": "code301W1U",
            "type": "code",
            "evaluator": "JavaScript",
            "input": {
                "body": "// Client-side JavaScript"
            },
            "output": {
                "selectedType": "Hidden"
            },
            "evaluatorReader": true,
            "lineCount": 1
        },
        {
            "id": "text97Oipt",
            "type": "text",
            "body": "<p style=\"margin-bottom: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px;\">Beaker also supports <b>Julia</b>, <b>Groovy</b>, <b>Ruby</b>, and <b>Node</b>. To add another language to this notebook, select <b>Notebook</b> &#9654; <b>Plugin manager</b> from the menu on top of the screen.</p><p style=\"margin-top: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px; margin-bottom: 0px !important;\">For general help, see the tutorial notebook under <b>Help</b> &#9654; <b>Tutorial notebook</b></p>",
            "evaluatorReader": false
        }
    ]
    }


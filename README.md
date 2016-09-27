<!--
    Copyright 2014 TWO SIGMA OPEN SOURCE, LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

#Beaker - the data scientist's laboratory

Beaker is a code notebook that allows you to analyze, visualize, and document data using multiple programming languages. Beaker's plugin-based polyglot architecture enables you to seamlessly switch between languages in your documents and add support for your favorite languages that we've missed.

Beaker is both a server that you can run in the cloud, an application that you can download and run, and
a [Docker container](https://hub.docker.com/r/beakernotebook/beaker/) that you can run anywhere.

This page is for developers.  If you want to use or learn more about Beaker, see the [home page](http://beakernotebook.com).

# WebPPL support
[webppl](webppl.org) is a small but feature-rich probabilistic programming language embedded in Javascript. Language support for beaker is at proof of concept stage. Passing variables into webppl is supported, as is reading out the result. No visualization support yet.

[webppl globalStore](http://webppl.readthedocs.io/en/master/globalstore.html) is initialized to beaker.initialStore, and the return value is stored at beaker.result.

See the tutorial under help for an example of how to use. To run, first install Docker. Then run ` docker run -it -p 8800:8800 tbenst/beaker-webppl`

#Screenshots

![webppl-Example](https://raw.githubusercontent.com/tbenst/beaker-webppl/master/doc/webppl-Example.png)

![screenshots](https://raw.githubusercontent.com/twosigma/beaker-notebook/master/doc/screenshots.png)

#Publication Server
Notebooks can published and converted into web pages that anyone can access with an ordinary web browser, even on a mobile device.
This free service is integrated into the application, and can be applied with just one click to any cell, section, or a whole notebook.
Plots and tables remain interactive in published version.  Learn more, and explore a variety of notebooks from the user community on the [publication server](http://pub.beakernotebook.com/).

#Build, test, and run instructions

See the page for your platform for how to build from source:
[Ubuntu](https://github.com/twosigma/beaker-notebook/wiki/Ubuntu-build-and-run),
[Mac](https://github.com/twosigma/beaker-notebook/wiki/Mac-build-and-run),
[Windows](https://github.com/twosigma/beaker-notebook/wiki/Windows-build-and-run), and
[Docker](https://github.com/twosigma/beaker-notebook/blob/master/Dockerfile).  We use gradle to compile the project.

Say `cd test; ./runner` to run the end-to-end tests with Protractor.

Say `cd test; ./perftest` to run performance tests with Protractor. Performance tests are pretty demanding and will lock up the browser performing the tests. Any interaction with the browser while the tests are running will affect the tests and skew the results.

[![Build Status](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/buildStatus/icon?job=Beaker master)](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/job/Beaker master)

To enable the debug menu, add the following to your `beaker.pref.json` file:

    "notebook-app-menu-plugins": ["./plugin/menu/debug.js"]

##Presentation and Demo on YouTube

[![Greenwood and Draves speak](http://img.youtube.com/vi/wu65cYffMSg/0.jpg)](http://beakernotebook.com/videos)

##Language support

We currently provide support for Python, R, Julia, Groovy, Ruby, Java, Scala, Kdb, Clojure, JavaScript, HTML, Markdown, and LaTeX.

Beaker supports *autotranslation* of variables between languages.  For
example, you can read and process some data in Python, model it with
R, and then turn that into an interactive visualization with
Javascript.

##Architecture

Beaker is primarily composed of a Java server and a Javascript client.
There are plugins for each language, and interaction plugins as well.
The architecture and the organization of the source is code is covered
in the [Architecture
wiki](https://github.com/twosigma/beaker-notebook/wiki/Architecture).

Plugin specifications: [Evaluator
plugins](https://github.com/twosigma/beaker-notebook/wiki/Eval-plugin-spec),
[Menu
plugins](https://github.com/twosigma/beaker-notebook/wiki/Menu-plugin-spec),
[Output display
plugins](https://github.com/twosigma/beaker-notebook/wiki/OutputDisplay-spec)

##Open source

Beaker's full source code and documentation is available under the
Apache 2.0 license.


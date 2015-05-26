
SHELL := /usr/bin/env bash
CONFIG := nginx.conf

.PHONY: all copy-beaker watch instrument run compile

all:
	npm install
	node_modules/.bin/bower install --allow-root

watch:  compile
	PORT=8081 node_modules/.bin/roots watch --no-open

# *destructively* instrument the javascript to generate the istanbul coverage report
instrument:
	node_modules/.bin/istanbul instrument --embed-source -o public/js/main.js.tmp public/js/main.js
	mv public/js/main.js.tmp public/js/main.js

copy-beaker:
# note:  these Beaker files are copied directly to public here because
# beaker client expects to find these assets in a specific location,
# and adding it all to our assets/
# folder would also require about 50 lines to get added to the .gitignore
# - keeping it continually up-to-date to ignore the assets of beaker.
	mkdir -p public/plugin
	cp -r bower_components/beaker-notebook/core/src/main/web/plugin/* public/plugin/

	mkdir -p public/images
	cp -r bower_components/beaker-notebook/core/src/main/web/app/images/* public/images/

	mkdir -p public/app/images/
	cp public/images/beaker_icon* public/app/images/

	mkdir -p public/fonts
	cp -r bower_components/beaker-notebook/core/src/main/web/app/fonts/* public/fonts/

	mkdir -p public/plugins/eval/ipythonPlugins/ipython/
	cp bower_components/beaker-notebook/plugin/ipythonPlugins/src/dist/ipython/ipython.js public/plugins/eval/ipythonPlugins/ipython/
	mkdir -p public/plugins/eval/ipythonPlugins/vendor/ipython2
	cp bower_components/beaker-notebook/plugin/ipythonPlugins/src/dist/vendor/ipython2/*js  public/plugins/eval/ipythonPlugins/vendor/ipython2/
	mkdir -p public/plugins/eval/ipythonPlugins/vendor/ipython3
	cp bower_components/beaker-notebook/plugin/ipythonPlugins/src/dist/vendor/ipython3/*js  public/plugins/eval/ipythonPlugins/vendor/ipython3/

	mkdir -p public/plugins/eval/ipythonPlugins/julia/
	cp bower_components/beaker-notebook/plugin/ipythonPlugins/src/dist/julia/julia.js  public/plugins/eval/ipythonPlugins/julia/

	mkdir -p public/plugins/eval/node/
	cp bower_components/beaker-notebook/plugin/node/src/dist/node.js public/plugins/eval/node/
	cp bower_components/beaker-notebook/plugin/node/src/dist/node.js public/plugins/eval/node/

	mkdir -p public/plugins/eval/groovy/
	cp bower_components/beaker-notebook/plugin/groovy/src/dist/groovy.js public/plugins/eval/groovy/

	mkdir -p public/plugins/eval/javash/
	cp bower_components/beaker-notebook/plugin/javash/src/dist/javash.js public/plugins/eval/javash/

	mkdir -p public/plugins/eval/r/
	cp bower_components/beaker-notebook/plugin/r/src/dist/r.js public/plugins/eval/r/

	mkdir -p public/plugins/eval/scala/
	cp bower_components/beaker-notebook/plugin/scala/src/dist/scala.js public/plugins/eval/scala/

	mkdir -p public/js/beaker
	cp bower_components/beaker-notebook/embeddable_assets/*.js public/js/beaker/
	cp bower_components/beaker-notebook/embeddable_assets/*.js public/js/beaker/

	cd bower_components/beaker-notebook/core/ && unzip -ouq ../data/allDeps.zip
	mkdir -p public/css/bootstrap
	cp -r bower_components/beaker-notebook/core/src/vendor/bower_components/bootstrap-sass/assets/fonts/bootstrap public/css
	mkdir -p public/js/beaker/vendor
	cp -r bower_components/beaker-notebook/core/src/vendor/bower_components/katex-build public/js/beaker/vendor/katex-build
	cp -r bower_components/beaker-notebook/core/src/vendor/requirejs public/js/beaker/vendor/requirejs

	mkdir -p public/css
	cp bower_components/beaker-notebook/embeddable_assets/*.css public/css/

compile-roots:
	node_modules/.bin/roots compile --no-compress && chmod -R 755 public

compile: compile-roots copy-beaker

# it's convinent to allow relative paths for the NGINX_ROOT, but nginx requires an absolute path
run: export NGINX_ROOT := $(realpath $(NGINX_ROOT))
run: 	copy-beaker
	nginx -p . -c $(CONFIG)

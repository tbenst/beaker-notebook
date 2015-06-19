#!/bin/bash
# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

EXTDIR=../
VENDIR=$EXTDIR/core/src/main/web/vendor
WEBDIR=$EXTDIR/core/src/main/web/

rm -rf outdir
mkdir -p outdir
mkdir -p outdir/template
mkdir -p outdir/static
mkdir -p outdir/static/app
mkdir -p outdir/static/vendor
mkdir -p outdir/static/vendor/bower_components/

#mkdir -p outdir/static/static/
#mkdir -p outdir/static/vendor/bower_components/font-awesome/fonts/
#mkdir -p outdir/static/vendor/TableTools-2.2.3/images/
#mkdir -p outdir/static/vendor/bower_components/datatables/media/images/
#mkdir -p outdir/static/vendor/bower_components/font-awesome/fonts/

# copy all required media


cp $WEBDIR/app/dist/beakerApp.css  outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplay.css  outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplayVendor.js   outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplay.js  outdir/static/app/
cp $WEBDIR/app/dist/beakerVendor.js  outdir/static/app/
touch outdir/static/app/main.js


cp src/app/beaker_notebook.html outdir/template/
cp -r $WEBDIR/app/vendor/requirejs outdir/static/vendor/
cp -r $WEBDIR/app/vendor/katex-build  outdir/static/vendor/bower_components/
cp -r $WEBDIR/app/fonts outdir/static/
cp -r $WEBDIR/app/images outdir/static/
cp src/src/app.js outdir/static/app
cp $WEBDIR/app/temp/templates.js outdir/static/app/
cp -r $WEBDIR/app/mainapp/components/notebook/outputdisplay outdir/static/app/

BEAKERNOTEBOOKJS=(
    "app/utils/basic/commonutils.js"
    "app/utils/basic/angularutils.js"
    "app/utils/utils.js"
    "app/mainapp/services/notebookcellmodelmanager.js"
 )

for i in ${BEAKERNOTEBOOKJS[@]}; do
    mkdir -p outdir/static/$(dirname $i)
    cp $WEBDIR/$i outdir/static/$(dirname $i)
done



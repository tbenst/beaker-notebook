/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


var BeakerPageObject = require('../../beaker.po.js');
var path = require('path');
var beakerPO;

describe('Text, Formatting, and Equations tutorial', function () {

    beforeEach(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Ftext.bkr&readOnly=true")
            .then(done)
            .then(beakerPO.waitUntilLoadingCellOutput());
    });

    it('Text, Formatting, and Equations', function () {
        var idCell = "markdown8nMuAN";
        beakerPO.scrollToBkCellByIdCell(idCell);
        var cellElem = beakerPO.getBkCellByIdCell(idCell);
        cellElem.click();
        expect(cellElem.getText()).toBe(" Beaker's text cells (insert one by clicking 'text' in the blue button bar) are based primarily on markdown,\n" +
            "but have a number of more advanced features as described below.  There are also HTML and TeX cells,\n" +
            "which you can insert with the 'code' menu in the blue button bar, and are also explained in their own\n" +
            "sections below.  Images can be included 'inline' in both HTML and text cells.\n" +
            "In addition, there are menu commands to control how the notebook is displayed:\n" +
            "* **Notebook → Lock**: hides the all the code, and removes the boxes from around the cells.\n" +
            "* **View → Show Hierarchy**: indents sections and adds numbering and lines to show hierarchy.\n" +
            "* **View → Advanced Mode**: reduces vertical space and hides the big run button (you can still run cells with the little run button in the upper-right of each cell.\n" +
            "* **View → Theme**: switch from the default black-on-white color theme to the light-on-dark ambience theme.");
    });

});
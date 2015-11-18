'use strict'

var express = require('express')
var http = require('http')
var uuid = require('node-uuid')
var Autocomplete = require('autocomplete')

var autocompleteVariants =['var','app','data','require','console', 'log', 'alert']
var code = "";
var codeLines = []

// Create the autocomplete object
var autocomplete = Autocomplete.connectAutocomplete();

// Initialize the autocomplete object and define a 
// callback to populate it with data

search(code)
function search(code){
	lineBreak(code)
	codeLines.forEach(function(entry) {
    	wordsBreak(entry);
	});
	unique(autocompleteVariants)
	autocomplete.initialize(function(onReady) {
    	onReady(autocompleteVariants);
	});
	console.log(findFinalVariants(getWordNeedAutocomplete(codeLines[codeLines.length-1])))
}
/*search("ar")*/


// Later...  When it's time to search:


function updateData(code) {
	var isExist = false;
	autocompleteVariants.forEach(function(entry) {
    	console.log(entry);
	});
}

function findFinalVariants(line) {
	if (line == "")
		return autocompleteVariants
	var matches = autocomplete.search(line);
	return matches;
}
function lineBreak(code){
	codeLines = code.split(/\r\n|\r|\n/);
}
function wordsBreak(line){
	var words = line.split(" ")
	words.forEach(function(entry) {
    	autocompleteVariants[autocompleteVariants.length] = entry
	});
}
function unique(arr) {
  var result = [];

  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      for (var j = 0; j < result.length; j++) { 
        if (result[j] == str) continue nextInput;
      }
      result.push(str);
    }

  return result;
}

function getWordNeedAutocomplete(code){
	var result;
	var index = 0;
	var charMassive = code.split("");
	for(var i = charMassive.length - 1; i >= 0; i--){
		if (charMassive[i] == " " || charMassive[i] == "=" || charMassive[i] == ";" || charMassive[i] == ")" || 
			charMassive[i] == "}" || charMassive[i] == "{" || charMassive[i] == "(" || charMassive[i] == ".") {
			index = i;
			break;
		}
	}
	if (index == charMassive.length - 1) {
		return ""
	}
	result = code.substr(index + 1, code.length)
	return result;
}
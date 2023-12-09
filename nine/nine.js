"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var getNextNumber = function (arr) {
    var diffs = [];
    var numberOfZeros = 0;
    for (var i = 1; i < arr.length; i++) {
        diffs.push(arr[i] - arr[i - 1]);
        if (diffs[diffs.length - 1] === 0) {
            numberOfZeros++;
        }
    }
    if (numberOfZeros === arr.length - 1) {
        return arr[arr.length - 1];
    }
    else {
        var next = getNextNumber(diffs);
        return arr[arr.length - 1] + next;
    }
};
var getPrevNumber = function (arr) {
    var diffs = [];
    var numberOfZeros = 0;
    for (var i = 1; i < arr.length; i++) {
        diffs.push(arr[i] - arr[i - 1]);
        if (diffs[diffs.length - 1] === 0) {
            numberOfZeros++;
        }
    }
    if (numberOfZeros === arr.length - 1) {
        return arr[0];
    }
    else {
        var prev = getPrevNumber(diffs);
        return arr[0] - prev;
    }
};
var resultNext = 0;
var resultPrev = 0;
for (var i = 0; i < lines.length; i++) {
    resultNext += getNextNumber(lines[i].split(' ').map(Number));
    resultPrev += getPrevNumber(lines[i].split(' ').map(Number));
}
console.log(resultNext, resultPrev);

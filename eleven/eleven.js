"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var getManhattanDistance = function (ax, ay, bx, by) {
    //console.log(ax, ay, bx, by, Math.max(ax, bx) - Math.min(ax, bx) + Math.max(ay, by) - Math.min(ay, by));
    return Math.max(ax, bx) - Math.min(ax, bx) + Math.max(ay, by) - Math.min(ay, by);
};
var moreColumns = new Array(lines[0].length);
var moreRows = new Array(lines.length);
var galaxyMap = [];
var EXPANSION = 1000000;
moreColumns[0] = 0;
for (var i = 0; i < lines[0].length; i++) {
    var additionalColumns = (moreColumns[i - 1] | 0) + EXPANSION - 1;
    for (var j = 0; j < lines.length; j++) {
        if (lines[j][i] !== '.') {
            additionalColumns = (moreColumns[i - 1] | 0);
            break;
        }
    }
    moreColumns[i] = additionalColumns;
}
moreRows[0] = 0;
for (var i = 0; i < lines.length; i++) {
    var additionalRows = (moreRows[i - 1] | 0) + EXPANSION - 1;
    for (var j = 0; j < lines[0].length; j++) {
        if (lines[i][j] !== '.') {
            additionalRows = (moreRows[i - 1] | 0);
            break;
        }
    }
    moreRows[i] = additionalRows;
}
for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === '#') {
            galaxyMap.push([i, j]);
        }
    }
}
var sumOfAllShortestPaths = 0;
for (var i = 0; i < galaxyMap.length - 1; i++) {
    for (var j = i + 1; j < galaxyMap.length; j++) {
        sumOfAllShortestPaths += getManhattanDistance(galaxyMap[i][0] + moreRows[galaxyMap[i][0]], galaxyMap[i][1] + moreColumns[galaxyMap[i][1]], galaxyMap[j][0] + moreRows[galaxyMap[j][0]], galaxyMap[j][1] + moreColumns[galaxyMap[j][1]]);
    }
}
console.log(sumOfAllShortestPaths);

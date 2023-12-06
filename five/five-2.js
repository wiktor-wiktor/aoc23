"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var mapNext = function (value, amap) {
    for (var i = 0; i < amap.rangeLength.length; i++) {
        if (value >= amap.fromStart[i] && value < amap.fromStart[i] + amap.rangeLength[i]) {
            return amap.toStart[i] + (value - amap.fromStart[i]);
        }
    }
    return value;
};
var seedRanges = [];
var allMaps = [];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (i == 0) {
        seedRanges = line.split('seeds: ')[1].split(' ').map(Number);
        continue;
    }
    if (line === '') {
        allMaps.push({
            fromStart: [],
            toStart: [],
            rangeLength: []
        });
        i++;
        continue;
    }
    var params = line.split(' ').map(Number);
    allMaps[allMaps.length - 1].fromStart.push(params[1]);
    allMaps[allMaps.length - 1].toStart.push(params[0]);
    allMaps[allMaps.length - 1].rangeLength.push(params[2]);
}
var seedMin = Infinity;
var seedMax = 0;
for (var i = 0; i < seedRanges.length; i += 2) {
    if (seedRanges[i] < seedMin) {
        seedMin = seedRanges[i];
    }
    if (seedRanges[i] + seedRanges[i + 1] > seedMax) {
        seedMax = seedRanges[i] + seedRanges[i + 1];
    }
}
var range = function (start, stop, step) {
    if (step === void 0) { step = 1; }
    return Array(Math.ceil((stop - start) / step)).fill(start).map(function (x, y) { return x + y * step; });
};
var allOfTheSeeds = new Set();
var addSeeds = function (newSeeds) {
    newSeeds.forEach(allOfTheSeeds.add, allOfTheSeeds);
};
// for (let i = 0; i < seedRanges.length; i += 2) {
//     addSeeds(range(seedRanges[i], seedRanges[i] + seedRanges[i + 1]));
// }
var lastMap = allMaps[allMaps.length - 1];
for (var i = 0; i < lastMap.rangeLength.length; i++) {
    addSeeds(range(lastMap.toStart[i], lastMap.toStart[i] + lastMap.rangeLength[i]));
}
console.log(allOfTheSeeds.size);

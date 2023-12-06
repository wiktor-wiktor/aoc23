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
            //console.log(value, amap.fromStart[i], amap.toStart[i], (value - amap.fromStart[i]));
            return amap.toStart[i] + (value - amap.fromStart[i]);
        }
    }
    return value;
};
var seeds = [];
var allMaps = [];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (i == 0) {
        seeds = line.split('seeds: ')[1].split(' ').map(Number);
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
var minValue = Infinity;
for (var i = 0; i < seeds.length; i++) {
    var currentValue = seeds[i];
    for (var j = 0; j < allMaps.length; j++) {
        currentValue = mapNext(currentValue, allMaps[j]);
    }
    if (currentValue < minValue) {
        minValue = currentValue;
    }
}
console.log(minValue);

"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var sumOfPowers = 0;
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var allDraws = line.split(': ')[1];
    var draws = allDraws.split(';');
    var maxRedSoFar = 0;
    var maxGreenSoFar = 0;
    var maxBlueSoFar = 0;
    for (var j = 0; j < draws.length; j++) {
        var draw = draws[j];
        var red = parseInt((draw.match(/([0-9]+) red/) || ['0', '0'])[1]);
        var green = parseInt((draw.match(/([0-9]+) green/) || ['0', '0'])[1]);
        var blue = parseInt((draw.match(/([0-9]+) blue/) || ['0', '0'])[1]);
        if (red > maxRedSoFar) {
            maxRedSoFar = red;
        }
        if (green > maxGreenSoFar) {
            maxGreenSoFar = green;
        }
        if (blue > maxBlueSoFar) {
            maxBlueSoFar = blue;
        }
    }
    var power = maxRedSoFar * maxGreenSoFar * maxBlueSoFar;
    sumOfPowers += power;
}
console.log(sumOfPowers);

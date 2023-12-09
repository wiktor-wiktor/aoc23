"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var instructions = lines[0];
var desertMap = {};
var currentNodes = [];
var loopLength = [];
for (var i = 2; i < lines.length; i++) {
    var line = lines[i];
    var parsed = line.match(/([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})/) || [];
    desertMap[parsed[1]] = {
        L: parsed[2],
        R: parsed[3]
    };
    if (parsed[1][2] === 'A') {
        currentNodes.push(parsed[1]);
        loopLength.push(0);
    }
}
var stepCounter = 0;
var isFinished = function () {
    for (var i = 0; i < currentNodes.length; i++) {
        var node = currentNodes[i];
        if (node[2] === 'Z' && loopLength[i] === 0) {
            loopLength[i] = stepCounter;
        }
    }
    for (var i = 0; i < currentNodes.length; i++) {
        var loop = loopLength[i];
        if (loop === 0) {
            return false;
        }
    }
    return true;
};
var currentDirectionIndex = 0;
while (!isFinished()) {
    for (var i = 0; i < currentNodes.length; i++) {
        currentNodes[i] = desertMap[currentNodes[i]][instructions[currentDirectionIndex]];
    }
    currentDirectionIndex = (currentDirectionIndex + 1) % instructions.length;
    stepCounter++;
}
var gcd = function (a, b) { return b == 0 ? a : gcd(b, a % b); };
var lcm = function (a, b) { return a / gcd(a, b) * b; };
var lcmAll = function (ns) { return ns.reduce(lcm, 1); };
console.log(loopLength);
console.log(lcmAll(loopLength));

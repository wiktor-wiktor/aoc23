"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input-test-2.txt', 'utf8');
var lines = input.split('\n');
var instructions = lines[0];
var desertMap = {};
for (var i = 2; i < lines.length; i++) {
    var line = lines[i];
    var parsed = line.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})/) || [];
    desertMap[parsed[1]] = {
        L: parsed[2],
        R: parsed[3]
    };
}
var stepCounter = 0;
var currentStep = 'AAA';
var currentDirectionIndex = 0;
while (currentStep !== 'ZZZ') {
    currentStep = desertMap[currentStep][instructions[currentDirectionIndex]];
    currentDirectionIndex = (currentDirectionIndex + 1) % instructions.length;
    stepCounter += 1;
}
console.log(stepCounter);

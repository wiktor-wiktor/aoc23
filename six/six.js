"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var times = Array.from(lines[0].matchAll(/[0-9]+/g)).map(function (e) { return e[0]; }).map(Number);
var records = Array.from(lines[1].matchAll(/[0-9]+/g)).map(function (e) { return e[0]; }).map(Number);
var oneTime = Number(Array.from(lines[0].matchAll(/[0-9]+/g)).map(function (e) { return e[0]; }).join(''));
var oneRecord = Number(Array.from(lines[1].matchAll(/[0-9]+/g)).map(function (e) { return e[0]; }).join(''));
var D = 0.00011;
var result = 1;
for (var i = 0; i < times.length; i++) {
    var minValue_1 = (1 / 2) * (times[i] - Math.sqrt(times[i] * times[i] - 4 * records[i]));
    var maxValue_1 = (1 / 2) * (Math.sqrt(times[i] * times[i] - 4 * records[i]) + times[i]);
    result *= Math.ceil(maxValue_1 - D) - Math.ceil(minValue_1 + D);
}
console.log(result);
var minValue = (1 / 2) * (oneTime - Math.sqrt(oneTime * oneTime - 4 * oneRecord));
var maxValue = (1 / 2) * (Math.sqrt(oneTime * oneTime - 4 * oneRecord) + oneTime);
console.log(Math.ceil(maxValue - D) - Math.ceil(minValue + D));

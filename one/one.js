"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var DIGITS = '0123456789';
var INITIALS_OF_DIGITS = 'otfsen';
var WORDS_FOR_DIGITS = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];
var sum = 0;
var checkForLiteralDigit = function (line, index) {
    for (var i = 0; i < WORDS_FOR_DIGITS.length; i++) {
        var word = WORDS_FOR_DIGITS[i];
        if (line.substr(index, word.length) === word) {
            return i + 1;
        }
    }
    return 0;
};
lines.forEach(function (line) {
    var calibraitonDigit = '';
    try {
        Array.from(line).forEach(function (char, idx) {
            if (INITIALS_OF_DIGITS.includes(char)) {
                var possibleDigit = checkForLiteralDigit(line, idx);
                if (possibleDigit > 0) {
                    calibraitonDigit += possibleDigit;
                    throw new Error('Found a digit');
                }
            }
            else if (DIGITS.includes(char)) {
                calibraitonDigit += parseInt(char);
                throw new Error('Found a digit');
            }
        });
    }
    catch (_a) { }
    try {
        Array.from(line).reverse().forEach(function (char, idx) {
            if (INITIALS_OF_DIGITS.includes(char)) {
                var possibleDigit = checkForLiteralDigit(line, line.length - 1 - idx);
                if (possibleDigit > 0) {
                    calibraitonDigit += possibleDigit;
                    throw new Error('Found a digit');
                }
            }
            else if (DIGITS.includes(char)) {
                calibraitonDigit += parseInt(char);
                throw new Error('Found a digit');
            }
        });
    }
    catch (_b) { }
    sum += parseInt(calibraitonDigit);
});
console.log("Sum: ".concat(sum));

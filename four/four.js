"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var cardIndex = Array(lines.length).fill(1);
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var numbers = line.split(': ')[1];
    var winning = new Set(numbers.split('|')[0].replace(/  /g, ' ').split(' '));
    var scratched = new Set(numbers.split('|')[1].replace(/  /g, ' ').split(' '));
    winning.delete('');
    scratched.delete('');
    var setSumSet = new Set(winning);
    scratched.forEach(setSumSet.add, setSumSet);
    if (winning.size + scratched.size - setSumSet.size === 0) {
        continue;
    }
    var points = winning.size + scratched.size - setSumSet.size;
    for (var c = 0; c < cardIndex[i]; c++) {
        for (var j = 0; j < points; j++) {
            cardIndex[i + j + 1] += 1;
        }
    }
}
var amountOfScratchcards = cardIndex.reduce(function (acc, curr) { return acc + curr; }, 0);
console.log(amountOfScratchcards);

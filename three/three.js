"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var engineMap = [];
var numbers = '1234567890';
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
        var char = line[j];
        if (!engineMap[i]) {
            engineMap[i] = [];
        }
        engineMap[i].push(char);
    }
}
var potentialParts = [];
for (var i = 0; i < engineMap.length; i++) {
    var line = engineMap[i];
    var currentPart = null;
    for (var j = 0; j < line.length; j++) {
        var char = line[j];
        if (numbers.includes(char)) {
            if (currentPart) {
                currentPart.length++;
                currentPart.value += char;
            }
            else {
                currentPart = {
                    line: i,
                    index: j,
                    length: 1,
                    value: char
                };
            }
        }
        else {
            if (currentPart) {
                potentialParts.push(currentPart);
                currentPart = null;
            }
        }
    }
    if (currentPart) {
        potentialParts.push(currentPart);
        currentPart = null;
    }
}
var hasNeighbouringSymbol = function (line, index) {
    for (var i = line - 1; i < line - 1 + 3; i++) {
        for (var j = index - 1; j < index - 1 + 3; j++) {
            if (i > -1 && i < engineMap.length) {
                if (j > -1 && j < engineMap[0].length) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    if (engineMap[i][j] !== '.' && !numbers.includes(engineMap[i][j])) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};
var getNeighbouringGear = function (line, index) {
    for (var i = line - 1; i < line - 1 + 3; i++) {
        for (var j = index - 1; j < index - 1 + 3; j++) {
            if (i > -1 && i < engineMap.length) {
                if (j > -1 && j < engineMap[0].length) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    if (engineMap[i][j] === '*') {
                        return "".concat(i).concat(j);
                    }
                }
            }
        }
    }
    return '';
};
var verifiedParts = [];
var gears = {};
var sumOfThePartNumbers = 0;
for (var i = 0; i < potentialParts.length; i++) {
    var currentPart = potentialParts[i];
    for (var j = 0; j < currentPart.length; j++) {
        var neighbouringGear = getNeighbouringGear(currentPart.line, currentPart.index + j);
        if (neighbouringGear !== '') {
            if (!gears[neighbouringGear]) {
                gears[neighbouringGear] = [];
            }
            gears[neighbouringGear].push(parseInt(currentPart.value));
        }
        if (hasNeighbouringSymbol(currentPart.line, currentPart.index + j)) {
            verifiedParts.push(currentPart);
            sumOfThePartNumbers += parseInt(currentPart.value);
            break;
        }
    }
}
var sumOfGearRatios = 0;
for (var i = 0; i < Object.keys(gears).length; i++) {
    var gear = gears[Object.keys(gears)[i]];
    if (gear.length === 2) {
        var gearRatio = gear[0] * gear[1];
        sumOfGearRatios += gearRatio;
    }
}
console.log(sumOfGearRatios);

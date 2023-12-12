"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var pipeMap = [];
var startIndex = [0, 0];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
        var pipe = line[j];
        if (!pipeMap[i]) {
            pipeMap[i] = [];
        }
        pipeMap[i][j] = pipe;
        if (pipe === 'S') {
            startIndex = [i, j];
        }
    }
}
var previousIndex = [0, 0];
var startingPipe = '';
if (startIndex[0] === 0 && startIndex[1] === 0) {
    previousIndex = [1, 0];
    startingPipe = 'F';
}
else if (startIndex[0] === 0 && startIndex[1] === lines[0].length - 1) {
    previousIndex = [0, lines[0].length - 2];
    startingPipe = '7';
}
else if (startIndex[0] === lines.length - 1 && startIndex[1] === lines[0].length - 1) {
    previousIndex = [lines.length - 2, lines[0].length - 1];
    startingPipe = 'J';
}
else if (startIndex[0] === lines.length - 1 && startIndex[1] === 0) {
    previousIndex = [lines.length - 1, 1];
    startingPipe = 'L';
}
else {
    if (pipeMap[startIndex[0] - 1][startIndex[1]] === '7' ||
        pipeMap[startIndex[0] - 1][startIndex[1]] === '|' ||
        pipeMap[startIndex[0] - 1][startIndex[1]] === 'F') {
        previousIndex = [startIndex[0] - 1, startIndex[1]];
        if (pipeMap[startIndex[0]][startIndex[1] - 1] === 'L' ||
            pipeMap[startIndex[0]][startIndex[1] - 1] === '-' ||
            pipeMap[startIndex[0]][startIndex[1] - 1] === 'F') {
            startingPipe = 'J';
        }
        else if (pipeMap[startIndex[0]][startIndex[1] + 1] === 'J' ||
            pipeMap[startIndex[0]][startIndex[1] + 1] === '-' ||
            pipeMap[startIndex[0]][startIndex[1] + 1] === '7') {
            startingPipe = 'L';
        }
        else if (pipeMap[startIndex[0] + 1][startIndex[1]] === 'J' ||
            pipeMap[startIndex[0] + 1][startIndex[1]] === '|' ||
            pipeMap[startIndex[0] + 1][startIndex[1]] === 'L') {
            startingPipe = '|';
        }
    }
    else if (pipeMap[startIndex[0]][startIndex[1] + 1] === 'J' ||
        pipeMap[startIndex[0]][startIndex[1] + 1] === '-' ||
        pipeMap[startIndex[0]][startIndex[1] + 1] === '7') {
        previousIndex = [startIndex[0], startIndex[1] + 1];
        if (pipeMap[startIndex[0] + 1][startIndex[1]] === 'J' ||
            pipeMap[startIndex[0] + 1][startIndex[1]] === '|' ||
            pipeMap[startIndex[0] + 1][startIndex[1]] === 'L') {
            startingPipe = 'F';
        }
        else if (pipeMap[startIndex[0] - 1][startIndex[1]] === 'L' ||
            pipeMap[startIndex[0] - 1][startIndex[1]] === '-' ||
            pipeMap[startIndex[0] - 1][startIndex[1]] === 'F') {
            startingPipe = '-';
        }
    }
    else if (pipeMap[startIndex[0] + 1][startIndex[1]] === 'J' ||
        pipeMap[startIndex[0] + 1][startIndex[1]] === '|' ||
        pipeMap[startIndex[0] + 1][startIndex[1]] === 'L') {
        previousIndex = [startIndex[0] + 1, startIndex[1]];
        if (pipeMap[startIndex[0]][startIndex[1] - 1] === 'L' ||
            pipeMap[startIndex[0]][startIndex[1] - 1] === '-' ||
            pipeMap[startIndex[0]][startIndex[1] - 1] === 'F') {
            startingPipe = '7';
        }
    }
}
pipeMap[startIndex[0]][startIndex[1]] = startingPipe;
var currentIndex = [startIndex[0], startIndex[1]];
var getFromDirection = function () {
    var yDiff = currentIndex[0] - previousIndex[0];
    var xDiff = currentIndex[1] - previousIndex[1];
    switch ("".concat(yDiff).concat(xDiff)) {
        case '0-1':
            return 'R';
        case '01':
            return 'L';
        case '10':
            return 'U';
        case '-10':
            return 'D';
    }
};
var move = function () {
    var currentPipe = pipeMap[currentIndex[0]][currentIndex[1]];
    var from = getFromDirection();
    previousIndex[0] = currentIndex[0];
    previousIndex[1] = currentIndex[1];
    switch (currentPipe) {
        case 'J':
            if (from === 'U')
                currentIndex[1] = currentIndex[1] - 1;
            if (from === 'L')
                currentIndex[0] = currentIndex[0] - 1;
            break;
        case 'F':
            if (from === 'D')
                currentIndex[1] = currentIndex[1] + 1;
            if (from === 'R')
                currentIndex[0] = currentIndex[0] + 1;
            break;
        case '|':
            if (from === 'U')
                currentIndex[0] = currentIndex[0] + 1;
            if (from === 'D')
                currentIndex[0] = currentIndex[0] - 1;
            break;
        case 'L':
            if (from === 'U')
                currentIndex[1] = currentIndex[1] + 1;
            if (from === 'R')
                currentIndex[0] = currentIndex[0] - 1;
            break;
        case '-':
            if (from === 'L')
                currentIndex[1] = currentIndex[1] + 1;
            if (from === 'R')
                currentIndex[1] = currentIndex[1] - 1;
            break;
        case '7':
            if (from === 'L')
                currentIndex[0] = currentIndex[0] + 1;
            if (from === 'D')
                currentIndex[1] = currentIndex[1] - 1;
            break;
    }
};
move();
var moveCounter = 1;
while (currentIndex[0] !== startIndex[0] || currentIndex[1] !== startIndex[1]) {
    move();
    moveCounter++;
}
console.log(moveCounter / 2);

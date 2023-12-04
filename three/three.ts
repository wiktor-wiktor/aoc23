// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const engineMap: string[][] = [];
const numbers = '1234567890';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (!engineMap[i]) {
            engineMap[i] = [];
        }
        engineMap[i].push(char);
    }
}

type part = {
    line: number,
    index: number,
    length: number
    value: string
};

const potentialParts: part[] = [];

for (let i = 0; i < engineMap.length; i++) {
    const line = engineMap[i];
    let currentPart: part | null = null;

    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (numbers.includes(char)) {
            if (currentPart) {
                currentPart.length++;
                currentPart.value += char;
            } else {
                currentPart = {
                    line: i,
                    index: j,
                    length: 1,
                    value: char
                };
            }
        } else {
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

const hasNeighbouringSymbol = (line: number, index: number): boolean => {
    for (let i = line - 1; i < line - 1 + 3; i++) {
        for (let j = index - 1; j < index - 1 + 3; j++) {
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
}

const getNeighbouringGear = (line: number, index: number): string => {
    for (let i = line - 1; i < line - 1 + 3; i++) {
        for (let j = index - 1; j < index - 1 + 3; j++) {
            if (i > -1 && i < engineMap.length) {
                if (j > -1 && j < engineMap[0].length) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    if (engineMap[i][j] === '*') {
                        return `${i}${j}`;
                    }
                }
            }
        }
    }
    return '';
}

const verifiedParts: part[] = [];
const gears: { [key: string]: number[] } = {};

let sumOfThePartNumbers = 0;
for (let i = 0; i < potentialParts.length; i++) {
    const currentPart = potentialParts[i];

    for (let j = 0; j < currentPart.length; j++) {
        const neighbouringGear = getNeighbouringGear(currentPart.line, currentPart.index + j)
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

let sumOfGearRatios = 0;
for (let i = 0; i < Object.keys(gears).length; i++) {
    const gear = gears[Object.keys(gears)[i]];
    if (gear.length === 2) {
        const gearRatio = gear[0] * gear[1];
        sumOfGearRatios += gearRatio;
    }
}

console.log(sumOfGearRatios);
// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input-test-2.txt', 'utf8');
const lines: string[] = input.split('\n');

const instructions = lines[0];
type mapEntry = { L: string, R: string };
const desertMap: { [key: string]: mapEntry } = {};

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const parsed = line.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})/) || [];
    desertMap[parsed[1]] = {
        L: parsed[2],
        R: parsed[3]
    }
}

let stepCounter = 0;
let currentStep = 'AAA';
let currentDirectionIndex = 0;
while (currentStep !== 'ZZZ') {
    currentStep = desertMap[currentStep][instructions[currentDirectionIndex]];

    currentDirectionIndex = (currentDirectionIndex + 1) % instructions.length;
    stepCounter += 1;
}

console.log(stepCounter);
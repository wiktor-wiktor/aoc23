// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const instructions = lines[0];
type mapNode = string;
type mapEntry = { L: mapNode, R: mapNode };
const desertMap: { [key: string]: mapEntry } = {};

const currentNodes: mapNode[] = [];
const loopLength: number[] = [];

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const parsed = line.match(/([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})/) || [];
    desertMap[parsed[1]] = {
        L: parsed[2],
        R: parsed[3]
    }

    if (parsed[1][2] === 'A') {
        currentNodes.push(parsed[1]);
        loopLength.push(0);
    }
}

let stepCounter = 0;
const isFinished = (): boolean => {
    for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];

        if (node[2] === 'Z' && loopLength[i] === 0) {
            loopLength[i] = stepCounter;
        }
    }

    for (let i = 0; i < currentNodes.length; i++) {
        const loop = loopLength[i];

        if (loop === 0) {
            return false;
        }
    }

    return true;
}

let currentDirectionIndex = 0;
while (!isFinished()) {
    for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i] = desertMap[currentNodes[i]][instructions[currentDirectionIndex]];
    }
    currentDirectionIndex = (currentDirectionIndex + 1) % instructions.length;
    stepCounter++;
}

const gcd = (a, b) => b == 0 ? a : gcd(b, a % b)
const lcm = (a, b) => a / gcd(a, b) * b
const lcmAll = (ns) => ns.reduce(lcm, 1)

console.log(loopLength);
console.log(lcmAll(loopLength));
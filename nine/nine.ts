// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const getNextNumber = (arr: number[]): number => {
    const diffs: number[] = [];
    let numberOfZeros = 0;

    for (let i = 1; i < arr.length; i++) {
        diffs.push(arr[i] - arr[i - 1]);
        if (diffs[diffs.length - 1] === 0) {
            numberOfZeros++;
        }
    }

    if (numberOfZeros === arr.length - 1) {
        return arr[arr.length - 1];
    } else {
        const next = getNextNumber(diffs);
        return arr[arr.length - 1] + next;
    }
}

const getPrevNumber = (arr: number[]): number => {
    const diffs: number[] = [];
    let numberOfZeros = 0;

    for (let i = 1; i < arr.length; i++) {
        diffs.push(arr[i] - arr[i - 1]);
        if (diffs[diffs.length - 1] === 0) {
            numberOfZeros++;
        }
    }

    if (numberOfZeros === arr.length - 1) {
        return arr[0];
    } else {
        const prev = getPrevNumber(diffs);
        return arr[0] - prev;
    }
}

let resultNext = 0;
let resultPrev = 0;
for (let i = 0; i < lines.length; i++) {
    resultNext += getNextNumber(lines[i].split(' ').map(Number));
    resultPrev += getPrevNumber(lines[i].split(' ').map(Number));
}

console.log(resultNext, resultPrev);

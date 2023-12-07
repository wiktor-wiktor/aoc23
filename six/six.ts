// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const times: number[] = Array.from(lines[0].matchAll(/[0-9]+/g)).map(e => e[0]).map(Number);
const records: number[] = Array.from(lines[1].matchAll(/[0-9]+/g)).map(e => e[0]).map(Number);

const oneTime = Number(Array.from(lines[0].matchAll(/[0-9]+/g)).map(e => e[0]).join(''));
const oneRecord = Number(Array.from(lines[1].matchAll(/[0-9]+/g)).map(e => e[0]).join(''));

const D = 0.00011;
let result = 1;

for (let i = 0; i < times.length; i++) {
    const minValue = (1 / 2) * (times[i] - Math.sqrt(times[i] * times[i] - 4 * records[i]));
    const maxValue = (1 / 2) * (Math.sqrt(times[i] * times[i] - 4 * records[i]) + times[i]);

    result *= Math.ceil(maxValue - D) - Math.ceil(minValue + D);
}

console.log(result);

const minValue = (1 / 2) * (oneTime - Math.sqrt(oneTime * oneTime - 4 * oneRecord));
const maxValue = (1 / 2) * (Math.sqrt(oneTime * oneTime - 4 * oneRecord) + oneTime);

console.log(Math.ceil(maxValue - D) - Math.ceil(minValue + D));
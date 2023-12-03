// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

let sumOfPowers = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const allDraws = line.split(': ')[1];
    const draws = allDraws.split(';');

    let maxRedSoFar = 0;
    let maxGreenSoFar = 0;
    let maxBlueSoFar = 0;

    for (let j = 0; j < draws.length; j++) {
        const draw = draws[j];
        const red = parseInt((draw.match(/([0-9]+) red/) || ['0', '0'])[1]);
        const green = parseInt((draw.match(/([0-9]+) green/) || ['0', '0'])[1]);
        const blue = parseInt((draw.match(/([0-9]+) blue/) || ['0', '0'])[1]);

        if (red > maxRedSoFar) {
            maxRedSoFar = red;
        }

        if (green > maxGreenSoFar) {
            maxGreenSoFar = green;
        }

        if (blue > maxBlueSoFar) {
            maxBlueSoFar = blue;
        }
    }

    const power = maxRedSoFar * maxGreenSoFar * maxBlueSoFar;
    sumOfPowers += power;
}

console.log(sumOfPowers);
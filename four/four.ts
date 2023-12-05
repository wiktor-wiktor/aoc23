// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const cardIndex: number[] = Array(lines.length).fill(1);

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const numbers = line.split(': ')[1];
    const winning = new Set(numbers.split('|')[0].replace(/  /g, ' ').split(' '));
    const scratched = new Set(numbers.split('|')[1].replace(/  /g, ' ').split(' '));

    winning.delete('');
    scratched.delete('');

    const setSumSet = new Set(winning);
    scratched.forEach(setSumSet.add, setSumSet);

    if (winning.size + scratched.size - setSumSet.size === 0) {
        continue;
    }

    const points = winning.size + scratched.size - setSumSet.size;

    for (let c = 0; c < cardIndex[i]; c++) {
        for (let j = 0; j < points; j++) {
            cardIndex[i + j + 1] += 1;
        }
    }
}

const amountOfScratchcards = cardIndex.reduce((acc, curr) => acc + curr, 0);

console.log(amountOfScratchcards);

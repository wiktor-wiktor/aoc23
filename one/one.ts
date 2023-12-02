// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const DIGITS = '0123456789';
const INITIALS_OF_DIGITS = 'otfsen';
const WORDS_FOR_DIGITS = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

let sum = 0;

const checkForLiteralDigit = (line: string, index: number): number => {
    for (let i = 0; i < WORDS_FOR_DIGITS.length; i++) {
        const word = WORDS_FOR_DIGITS[i];

        if (line.substr(index, word.length) === word) {
            return i + 1;
        }
    }
    return 0;
};

lines.forEach((line: string) => {
    let calibraitonDigit: string = '';

    try {
        Array.from(line).forEach((char: string, idx: number) => {
            if (INITIALS_OF_DIGITS.includes(char)) {
                const possibleDigit = checkForLiteralDigit(line, idx);
                if (possibleDigit > 0) {
                    calibraitonDigit += possibleDigit;
                    throw new Error('Found a digit');
                }

            } else if (DIGITS.includes(char)) {
                calibraitonDigit += parseInt(char);
                throw new Error('Found a digit');
            }
        });
    } catch { }

    try {
        Array.from(line).reverse().forEach((char: string, idx: number) => {
            if (INITIALS_OF_DIGITS.includes(char)) {
                const possibleDigit = checkForLiteralDigit(line, line.length - 1 - idx);
                if (possibleDigit > 0) {
                    calibraitonDigit += possibleDigit;
                    throw new Error('Found a digit');
                }

            } else if (DIGITS.includes(char)) {
                calibraitonDigit += parseInt(char);
                throw new Error('Found a digit');
            }
        });
    } catch { }

    sum += parseInt(calibraitonDigit);
});

console.log(`Sum: ${sum}`);
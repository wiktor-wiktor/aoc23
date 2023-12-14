// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const getManhattanDistance = (ax: number, ay: number, bx: number, by: number) => {
  //console.log(ax, ay, bx, by, Math.max(ax, bx) - Math.min(ax, bx) + Math.max(ay, by) - Math.min(ay, by));
  return Math.max(ax, bx) - Math.min(ax, bx) + Math.max(ay, by) - Math.min(ay, by);
}

let moreColumns: number[] = new Array(lines[0].length);
let moreRows: number[] = new Array(lines.length);
const galaxyMap: [number, number][] = [];

const EXPANSION = 1000000;

moreColumns[0] = 0;
for (let i = 0; i < lines[0].length; i++) {
  let additionalColumns = (moreColumns[i - 1] | 0) + EXPANSION - 1;
  for (let j = 0; j < lines.length; j++) {
    if (lines[j][i] !== '.') {
      additionalColumns = (moreColumns[i - 1] | 0);
      break;
    }
  }
  moreColumns[i] = additionalColumns;
}

moreRows[0] = 0;
for (let i = 0; i < lines.length; i++) {
  let additionalRows = (moreRows[i - 1] | 0) + EXPANSION - 1;
  for (let j = 0; j < lines[0].length; j++) {
    if (lines[i][j] !== '.') {
      additionalRows = (moreRows[i - 1] | 0);
      break;
    }
  }
  moreRows[i] = additionalRows;
}

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    if (lines[i][j] === '#') {
      galaxyMap.push([i, j])
    }
  }
}

let sumOfAllShortestPaths = 0;
for (let i = 0; i < galaxyMap.length - 1; i++) {
  for (let j = i + 1; j < galaxyMap.length; j++) {
    sumOfAllShortestPaths += getManhattanDistance(
      galaxyMap[i][0] + moreRows[galaxyMap[i][0]],
      galaxyMap[i][1] + moreColumns[galaxyMap[i][1]],
      galaxyMap[j][0] + moreRows[galaxyMap[j][0]],
      galaxyMap[j][1] + moreColumns[galaxyMap[j][1]]);
  }
}

console.log(sumOfAllShortestPaths);
// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

type agroMap = {
    fromStart: number[],
    toStart: number[],
    rangeLength: number[],
}

const mapNext = (value: number, amap: agroMap): number => {
    for (let i = 0; i < amap.rangeLength.length; i++) {
        if (value >= amap.fromStart[i] && value < amap.fromStart[i] + amap.rangeLength[i]) {
            return amap.toStart[i] + (value - amap.fromStart[i]);
        }
    }

    return value;
}

let seedRanges: number[] = [];
const allMaps: agroMap[] = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i == 0) {
        seedRanges = line.split('seeds: ')[1].split(' ').map(Number);
        continue;
    }

    if (line === '') {
        allMaps.push({
            fromStart: [],
            toStart: [],
            rangeLength: []
        });

        i++;
        continue;
    }

    const params: [number, number, number] = line.split(' ').map(Number) as [number, number, number];

    allMaps[allMaps.length - 1].fromStart.push(params[1]);
    allMaps[allMaps.length - 1].toStart.push(params[0]);
    allMaps[allMaps.length - 1].rangeLength.push(params[2]);
}

let seedMin = Infinity;
let seedMax = 0;

for (let i = 0; i < seedRanges.length; i += 2) {
    if (seedRanges[i] < seedMin) {
        seedMin = seedRanges[i];
    }

    if (seedRanges[i] + seedRanges[i + 1] > seedMax) {
        seedMax = seedRanges[i] + seedRanges[i + 1];
    }
}

const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

const allOfTheSeeds = new Set();

const addSeeds = (newSeeds: number[]) => {
    newSeeds.forEach(allOfTheSeeds.add, allOfTheSeeds);
}

// for (let i = 0; i < seedRanges.length; i += 2) {
//     addSeeds(range(seedRanges[i], seedRanges[i] + seedRanges[i + 1]));
// }

const lastMap = allMaps[allMaps.length - 1];
for (let i = 0; i < lastMap.rangeLength.length; i++) {
    addSeeds(range(lastMap.toStart[i], lastMap.toStart[i] + lastMap.rangeLength[i]));
}

console.log(allOfTheSeeds.size);
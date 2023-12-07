// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input-2.txt', 'utf8');
const lines: string[] = input.split('\n');

type agroMap = {
    fromStart: number[],
    toStart: number[],
    rangeLength: number[],
}

const mapNext = (value: number, amap: agroMap): number => {
    for (let i = 0; i < amap.rangeLength.length; i++) {
        if (value >= amap.fromStart[i] && value < amap.fromStart[i] + amap.rangeLength[i]) {
            //console.log(value, amap.fromStart[i], amap.toStart[i], (value - amap.fromStart[i]));
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

let minValue = Infinity;
for (let i = 0; i < seedRanges.length; i += 2) {
    for (let s = seedRanges[i]; s < seedRanges[i] + seedRanges[i + 1]; s++) {
        let currentValue = s;

        for (let j = 0; j < allMaps.length; j++) {
            currentValue = mapNext(currentValue, allMaps[j]);
        }

        if (currentValue < minValue) {
            minValue = currentValue;
            console.log(minValue);
        }
    }
}

console.log(minValue);
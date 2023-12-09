// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

type card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
const CARD_ORDER: card[] = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

type hand = {
    cards: card[];
    bid: number;
};

const allHands: hand[] = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const cards = line.split(' ')[0].split('') as card[];
    const bid = parseInt(line.split(' ')[1]);

    allHands.push({
        cards,
        bid
    });
};

type handType = '5' | '4' | 'F' | '3' | '22' | '2' | 'H';
const HAND_TYPES_ORDER: handType[] = ['5', '4', 'F', '3', '22', '2', 'H'];

const getHandType = (hand: hand): handType => {
    const cards = hand.cards;
    const bid = hand.bid;

    const cardCount: { [key in card]: number } = {
        'A': 0,
        'K': 0,
        'Q': 0,
        'J': 0,
        'T': 0,
        '9': 0,
        '8': 0,
        '7': 0,
        '6': 0,
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0
    };

    let currentMostAmount = 0;
    let currentMostAmountCardType: card = 'A';
    let amountOfJs = 0;
    cards.forEach(card => {
        if (card === 'J') {
            amountOfJs++;
        } else {
            cardCount[card]++;
            if (cardCount[card] > currentMostAmount) {
                currentMostAmount = cardCount[card];
                currentMostAmountCardType = card;
            }
        }
    });
    cardCount[currentMostAmountCardType] += amountOfJs;

    const cardCountValues = Object.values(cardCount);

    const hasFive = cardCountValues.includes(5);
    const hasFour = cardCountValues.includes(4);
    const hasThree = cardCountValues.includes(3);
    const hasTwo = cardCountValues.includes(2);
    const numberOfTwos = cardCountValues.filter(value => value === 2).length;

    const hasFlush = cards.every(card => card === cards[0]);

    if (hasFive && hasFlush) {
        return '5';
    }

    if (hasFour) {
        return '4';
    }

    if (hasThree && hasTwo) {
        return 'F';
    }

    if (hasThree) {
        return '3';
    }

    if (numberOfTwos === 2) {
        return '22';
    }

    if (hasTwo) {
        return '2';
    }

    return 'H';
}

const compareHandTypes = (handType1: handType, handType2: handType): number => {
    const handType1Index = HAND_TYPES_ORDER.indexOf(handType1);
    const handType2Index = HAND_TYPES_ORDER.indexOf(handType2);

    if (handType1Index > handType2Index) {
        return 1;
    }

    if (handType1Index < handType2Index) {
        return -1;
    }

    return 0;
}

const compareCards = (card1: card, card2: card): number => {
    const card1Index = CARD_ORDER.indexOf(card1);
    const card2Index = CARD_ORDER.indexOf(card2);

    if (card1Index > card2Index) {
        return 1;
    }

    if (card1Index < card2Index) {
        return -1;
    }

    return 0;
}

const compareHands = (hand1: hand, hand2: hand): number => {
    const handType1 = getHandType(hand1);
    const handType2 = getHandType(hand2);

    const handTypeComparison = compareHandTypes(handType1, handType2);

    if (handTypeComparison !== 0) {
        return handTypeComparison;
    }

    const cards1 = hand1.cards;
    const cards2 = hand2.cards;

    for (let i = 0; i < cards1.length; i++) {
        const card1 = cards1[i];
        const card2 = cards2[i];

        const cardComparison = compareCards(card1, card2);

        if (cardComparison !== 0) {
            return cardComparison;
        }
    }

    return 0;
}

const sortedHands = allHands.sort(compareHands);

let score = 0;
for (let i = 0; i < sortedHands.length; i++) {
    const hand = sortedHands[i];

    score += hand.bid * (sortedHands.length - i);
}

console.log(score);
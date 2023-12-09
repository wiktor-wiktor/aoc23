"use strict";
// npx tsc -w -p one.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var CARD_ORDER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
var allHands = [];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var cards = line.split(' ')[0].split('');
    var bid = parseInt(line.split(' ')[1]);
    allHands.push({
        cards: cards,
        bid: bid
    });
}
;
var HAND_TYPES_ORDER = ['5', '4', 'F', '3', '22', '2', 'H'];
var getHandType = function (hand) {
    var cards = hand.cards;
    var bid = hand.bid;
    var cardCount = {
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
    var currentMostAmount = 0;
    var currentMostAmountCardType = 'A';
    var amountOfJs = 0;
    cards.forEach(function (card) {
        if (card === 'J') {
            amountOfJs++;
        }
        else {
            cardCount[card]++;
            if (cardCount[card] > currentMostAmount) {
                currentMostAmount = cardCount[card];
                currentMostAmountCardType = card;
            }
        }
    });
    cardCount[currentMostAmountCardType] += amountOfJs;
    var cardCountValues = Object.values(cardCount);
    var hasFive = cardCountValues.includes(5);
    var hasFour = cardCountValues.includes(4);
    var hasThree = cardCountValues.includes(3);
    var hasTwo = cardCountValues.includes(2);
    var numberOfTwos = cardCountValues.filter(function (value) { return value === 2; }).length;
    var hasFlush = cards.every(function (card) { return card === cards[0]; });
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
};
var compareHandTypes = function (handType1, handType2) {
    var handType1Index = HAND_TYPES_ORDER.indexOf(handType1);
    var handType2Index = HAND_TYPES_ORDER.indexOf(handType2);
    if (handType1Index > handType2Index) {
        return 1;
    }
    if (handType1Index < handType2Index) {
        return -1;
    }
    return 0;
};
var compareCards = function (card1, card2) {
    var card1Index = CARD_ORDER.indexOf(card1);
    var card2Index = CARD_ORDER.indexOf(card2);
    if (card1Index > card2Index) {
        return 1;
    }
    if (card1Index < card2Index) {
        return -1;
    }
    return 0;
};
var compareHands = function (hand1, hand2) {
    var handType1 = getHandType(hand1);
    var handType2 = getHandType(hand2);
    var handTypeComparison = compareHandTypes(handType1, handType2);
    if (handTypeComparison !== 0) {
        return handTypeComparison;
    }
    var cards1 = hand1.cards;
    var cards2 = hand2.cards;
    for (var i = 0; i < cards1.length; i++) {
        var card1 = cards1[i];
        var card2 = cards2[i];
        var cardComparison = compareCards(card1, card2);
        if (cardComparison !== 0) {
            return cardComparison;
        }
    }
    return 0;
};
var sortedHands = allHands.sort(compareHands);
var score = 0;
for (var i = 0; i < sortedHands.length; i++) {
    var hand = sortedHands[i];
    score += hand.bid * (sortedHands.length - i);
}
console.log(score);

const loadFile = require("./loadFile")
const data = loadFile("./data/day22.txt", { split: /\r\n\r\n/g })

const parseDeck = str => str.split(/\r\n/).slice(1).map(n => +n)

const playRound = decks => {
    const cards = decks.map(deck => deck.shift())
    const winner = cards[0] > cards[1] ? 0 : 1
    decks[winner] = decks[winner].concat(cards.sort((a,b) => b - a))
}

const tallyScore = deck => deck
    .reverse()
    .reduce((sum, card, pos) => sum + card * (pos + 1), 0)

const solve1 = () => {
    const decks = data.map(parseDeck)
    while (!decks.find(deck => deck.length === 0)) {
        playRound(decks)
    }
    const score = tallyScore(decks.find(deck => deck.length))
    console.log('Puzzle 1', score)
}

const recordDecks = decks => decks.map(deck => deck.join()).join('|')

const playV2Round = (decks, history) => {
    const roundRecord = recordDecks(decks)
    if (history.indexOf(roundRecord) !== -1)  {
        decks[1] = []
        return 0
    }

    history.push(roundRecord)
    const cards = decks.map(deck => deck.shift())

    if ( decks[0].length >= cards[0] && decks[1].length >= cards[1]) {
        const deckDupe = [
            decks[0].slice(0, cards[0]),
            decks[1].slice(0, cards[1])
        ]
        const winner = startV2Game(deckDupe)
        decks[winner] = decks[winner].concat(winner ? cards.reverse() : cards)
        return winner
    }

    const winner = cards[0] > cards[1] ? 0 : 1
    decks[winner] = decks[winner].concat(cards.sort((a,b) => b - a))
    return winner
}

const startV2Game = decks => {
    const history = []

    while (!decks.find(deck => deck.length === 0)) {
        playV2Round(decks, history)
    }

    return decks.findIndex(deck => deck.length)
}

const solve2 = () => {
    const decks = data.map(parseDeck)
    const winner = startV2Game(decks)
    const score = tallyScore(decks[winner])
    console.log('Puzzle 2', score)
}

solve1()
solve2()
const loadFile = require("./loadFile")
const data = loadFile("./data/day23.txt")


class Cup {
    constructor (val) {
        this.val = val
        this.nextCup = null
    }

    setNext(cup) {
        this.nextCup = cup
    }

    getNext() {
        return this.nextCup
    }

    getVal() {
        return this.val
    }
}

const getDestVal = (val, total) => val <= 1 ? total : val - 1

const playMove = (cups, cupVals, curCup) => {
    const pulled1 = curCup.getNext()
    const pulled2 = pulled1.getNext()
    const pulled3 = pulled2.getNext()
    const pulledVals = [pulled1.getVal(), pulled2.getVal(), pulled3.getVal()]
    let destVal = getDestVal(curCup.getVal(), cups.length)
    while (pulledVals.indexOf(destVal) !== -1) {
        destVal = getDestVal(destVal, cups.length)
    }
    const newNext = pulled3.getNext()
    const dest = cupVals[destVal]
    const destNext = dest.getNext()

    curCup.setNext(newNext)
    dest.setNext(pulled1)
    pulled3.setNext(destNext)

    return newNext
}

const solve1 = () => {
    const order = data.split('')
    let cups = order.map(n => new Cup(+n))
    const cupVals = []

    cups.forEach((cup, i) => {
        cup.setNext(cups[(i + 1) % cups.length])
        cupVals[cup.getVal()] = cup
    });
    
    let numMoves = 100
    let move = 0
    let curCup = cups[0]

    do {
        curCup = playMove(cups, cupVals, curCup)
    } while (++move < numMoves)
    
    let cup = cups[0]
    let firstVal = cup.getVal()
    let nums = []
    do {
        nums.push(cup.getVal())
        cup = cup.getNext()
    } while (cup.getVal() !== firstVal && nums.length)

    while (nums[0] !== 1) {
        nums.push(nums.shift())
    }
    console.log(nums.slice(1).join(''))
}

const solve2 = () => {
    const order = data.split('')
    let cups = order.map(n => new Cup(+n))
    const cupVals = []

    while (cups.length < 1000000) {
        cups.push(new Cup(cups.length + 1))
    }
    cups.forEach((cup, i) => {
        cup.setNext(cups[(i + 1) % cups.length])
        cupVals[cup.getVal()] = cup
    });

    let numMoves = 10000000
    let move = 0
    let curCup = cups[0]
    do {
        curCup = playMove(cups, cupVals, curCup)
    } while (++move < numMoves)

    const cupA = cupVals[1].getNext().getVal()
    const cupB = cupVals[cupA].getNext().getVal()

    console.log(cupA * cupB)

}

solve1()
solve2()

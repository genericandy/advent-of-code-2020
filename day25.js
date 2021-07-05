const loadFile = require("./loadFile")
const data = loadFile("./data/day25.txt", { split: /\r\n/g, as: Number })


const transformSubject = (val, subject) => (val * subject ) % 20201227

const findLoop = (target) => {
    const subject = 7
    let testVal = 1
    let count = 0
    while ( testVal !== target) {
        count++
        const result = transformSubject(testVal, subject)
        testVal = result
    }
    return count
}

const transformLoop = (subject, count) => {
    let target = 1
    while (count--) {
        const newTarget = transformSubject(target, subject)
        target = newTarget
    }

    return target
}



const solve1 = () => {
    const doorKey = data[0]
    const cardKey = data[1]
    const doorLoop = findLoop(doorKey)
    const cardLoop = findLoop(cardKey)

    const doorResult = transformLoop(doorKey, cardLoop)
    const cardResult = transformLoop(cardKey, doorLoop)

    console.log(doorResult, cardResult)
}


// console.log(testVal)

solve1()
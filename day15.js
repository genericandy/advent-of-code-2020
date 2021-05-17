const loadFile = require("./loadFile")
const data = loadFile("./data/day15.txt", { split: /\,/, as: Number })

const playGame = (srcList, goal) => {
    const list = new Map()
    srcList.forEach((num, i) => list.set(num, { pos: i + 1, pos2: 0 }))
    let count = srcList.length
    let lastSpoken = srcList.slice(-1)[0]
    while (count++ < goal) {
        const lastSpokenData = list.get(lastSpoken)
        lastSpoken = lastSpokenData.pos2 ? lastSpokenData.pos - lastSpokenData.pos2 : 0
        const nextSpokenData = list.get(lastSpoken)
        list.set(lastSpoken, { pos: count, pos2: nextSpokenData ? nextSpokenData.pos : 0 })
    }
    return lastSpoken
}

// part 1
console.log(playGame(data, 2020))

// part 2
console.log(playGame(data, 30000000))

const loadFile = require('./loadFile')
const data = loadFile('./data/day10.txt', { split: /\r\n/, as: Number })

const sort = (a,b) => a - b

const getSortedList = list => {
    const sortedData = [0, ...list.sort(sort)]
    sortedData.push(sortedData.slice(-1)[0] + 3)
    return sortedData
}

// part 1
const getDiffs = (list) => {
    const sortedData = getSortedList(list)
    const diffs = [0,0,0]
    sortedData.forEach((n, i) => {
        const diff = i ? n - sortedData[i - 1] : n
        diffs[diff - 1]++
    })

    return diffs[0] * diffs[2]
}

console.log(getDiffs(data))

// part 2
const tribonacci = num => {
    if (num < 1) return 0
    if (num == 1) return 1
    return tribonacci(num - 1) + tribonacci(num - 2)+ tribonacci(num - 3)
}

const countUniqueSequences = (list) => {
    const sortedData = getSortedList(list)
    let sequence = 1
    const sequences = []
    sortedData.forEach((num, i) => {
        if (i && num - sortedData[i-1] < 3 ) {
            sequence++
        } else {
            sequences.push(tribonacci(sequence))
            sequence = 1
        }
    })
    sequences.push(tribonacci(sequence))

    return sequences.reduce((t,n) => t * n, 1)
}

console.log(countUniqueSequences(data))
const loadFile = require('./loadFile')
const data = loadFile('./data/day9.txt', { split: /\r\n/, as: Number })

const findAddend = (total, list)  => list.find(
    (num, i) => total-num !== list[i] && list.indexOf(total-num) + 1
)

const findViolation = (preamble, list) => list.find((num, i) => {
    if (i < preamble) {
        return false
    }
    const addends = list.slice(i - preamble,i)
    return i >= preamble && !findAddend(num, addends)
})

// part 1
const violation = findViolation(25, data)
console.log(violation)

const findAddends = (total, list) => {
    let addends = []
    const res = list.find((num, i) => {
        addends = []
        let sum = 0
        do {
            const num = list[i]
            addends.push(num)
            sum += num
            i++
        } while (sum < total)
        return sum === total
    })

    return Math.min(...addends) + Math.max(...addends)
}

// part 2
console.log(findAddends(violation, data))
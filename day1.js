const loadFile = require('./loadFile')
const data = loadFile('./data/day1.txt', { split: /\r\n/, as: Number})

const findDifference = (total, val) => data.indexOf(total - val) + 1

// part 1
const res = data.find( (val) => findDifference(2020, val) )
const answer1 = res * (2020 - res)
console.log(answer1)

// part 2
let answer2
data.find( (val) => {
    const subtotal = 2020 - val
    const thirdVal = data.find( val2 => val2 !== val && findDifference(subtotal, val2))
    return answer2 = val * (subtotal - thirdVal) * thirdVal
})
console.log(answer2)
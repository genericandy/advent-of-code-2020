const loadFile = require('./loadFile')
const data = loadFile('./data/day3.txt', { split: /\r\n/})

const countBy = (right, down) => (total, row, i) => {
    if (i % down !== 0) return total
    return row[(right * i/down)%row.length] === '#' ? total + 1 : total
}

const countTrees = (right, down) => data.reduce(countBy(right, down), 0)
// part 1
const answer1 = countTrees(3, 1)
console.log(answer1)

const answer2 = countTrees(1,1) * countTrees(3,1) * countTrees(5,1) * countTrees(7,1) * countTrees(1,2)
console.log(answer2)
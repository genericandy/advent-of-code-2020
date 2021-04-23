const loadFile = require('./loadFile')
const data = loadFile('./data/day6.txt', { split: /\r\n\r\n/ })

// part 1
const answer1 = data.reduce( (total, str) => {
    const map = new Set(str.replace(/\r\n/g, '').split(''))
    return total + map.size
}, 0)
console.log(answer1)

// part 2
const answer2 = data.reduce( (total, str) => {
    const arr = str.split(/\r\n/).sort((a,b) => a.length - b.length)
    let matches = 0
    for (let ltr of arr[0]) {
        if (arr.every(str => str.indexOf(ltr) + 1)) matches += 1;
    }
    return total + matches
}, 0)
console.log(answer2)
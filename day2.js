const loadFile = require('./loadFile')
const data = loadFile('./data/day2.txt', { split: /\r\n/})

// part 1
const parseString = str => {
    const [min,max,char,pwd] = str.split(/[-\s\:]+/)
    const count = pwd.split('').filter(ltr => ltr === char).length
    return count <= +max && count >= +min
}
const answer1 = data.filter(parseString).length
console.log(answer1)

const parseString2 = str => {
    const [min,max,char,pwd] = str.split(/[-\s\:]+/)
    const char1Match = pwd[+min-1] === char
    const char2Match = pwd[+max-1] === char
    return (char1Match && !char2Match) || (!char1Match && char2Match)
}

const answer2 = data.filter(parseString2).length
console.log(answer2)
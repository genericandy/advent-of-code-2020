const loadFile = require('./loadFile')
const data = loadFile('./data/day4.txt')

const dataList = (String.raw`${data}`).replace(/\r\n/g, ' ').split('  ')

// part 1
const match = str => /^(?=.*\bbyr\b)(?=.*\biyr\b)(?=.*\beyr\b)(?=.*\bhgt\b)(?=.*\bhcl\b)(?=.*\becl\b)(?=.*\bpid\b).*$/.test(str)
const answer1 = dataList.filter(match).length
console.log(answer1)

// part 2
const match2 = str => {
    return /^(?=.*\bbyr:(19[2-9]\d|200[0-2])\b)(?=.*\biyr:20(1\d|20)\b)(?=.*\beyr:20(2\d|30)\b)(?=.*\bhgt:(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)\b)(?=.*\bhcl:\#[a-f\d]{6}\b)(?=.*\becl:(amb|b(lu|rn)|gr(y|n)|hzl|oth)\b)(?=.*\bpid:\d{9}\b).*$/.test(str)
}
const answer2 = dataList.filter(match2).length
console.log(answer2)

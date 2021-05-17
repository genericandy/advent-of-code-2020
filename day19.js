const loadFile = require("./loadFile")
const data = loadFile("./data/day19.txt")

let rules = []
let processedRules = []
let tests = []

const parseData = list => {
    list.match(/^\d+:.+/gm)
        .forEach(str => {
            const split = str.replace(/"/g, '').split(':')
            rules[+split[0]] =  `( ${split[1]} )`
        })

    tests = list.match(/[ab]{2,}/gm)
}
const processRule = rule => {
    let nums
    while (nums = rule.match(/\d+/)) {        
        rule = nums.reduce((str, num) => {
            processedRules.push(num)
            return str.replace(num, rules[+num])
        }, rule)
    }
    return rule.replace(/\s/g, '')
}

const testRule = rule => tests.filter(test => new RegExp(rule).test(test))

// part 1
const matchRule1 = (list, rule) => {
    parseData(list)
    const regex = processRule(rules[rule])
    const passedTests = testRule('^' + regex + '$')
    return passedTests.length
}

console.log(matchRule1(data, 0))

const removeMatches = (rule, str) => {
    let matches = 0
    while (rule.test(str)) {
        matches++
        str = str.replace(rule, '')
    }
    return { str, matches }
}

// part 2
const matchRule2 = () => {
    rules[8] = '( 42 )'
    rules[11] = '( 31 )'
    const rule8 = RegExp(processRule('^' + rules[8]))
    const rule11 = RegExp(processRule(rules[11]))
    const passedTests = tests.filter(str => {
        const res8 = removeMatches(rule8, str)
        const res11 = removeMatches(rule11, res8.str)
        return res11.str === '' && res8.matches > res11.matches && res11.matches
    })
    return passedTests.length
}

console.log(matchRule2())


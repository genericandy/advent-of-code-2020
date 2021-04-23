const loadFile = require('./loadFile')
const data = loadFile('./data/day7.txt', { split: /\r\n/ })

// part 1
const addParents = (child, set) => {
    data.forEach( rule => {
        const parent = rule.match( new RegExp(`^(.*)(?=bags contain.*${child})`))
        if (parent && !set.has(parent)) {
            addParents(parent[0], set)
            set.add(parent[0])
        }
    })
    return set
}

const answer1 = addParents('shiny gold', new Set())
console.log(answer1.size)

// part 2
const addChildren = (bagType, multiplier) => {
    const parent = data.find(str => str.indexOf(bagType) === 0)
    const children = parent.match(/((?<=\d )\w+ \w+)+/g)
    const amts = parent.match(/\d/g)
    if (!children) {
        return 0
    }
    return children.reduce((sum, child, i) => {
        const amt = +amts[i] * multiplier
        return sum + amt + addChildren(child, amt)
    }, 0)
}

console.log(addChildren('shiny gold', 1))
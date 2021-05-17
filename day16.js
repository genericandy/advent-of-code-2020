const loadFile = require("./loadFile")
const data = loadFile("./data/day16.txt", { split: /\r\n\r\n/g })

const parseTicket = str => str.match(/\d+/g).map( n => +n )

const isBetween = (n, min, max) => n >= min && n <= max

const parseRule = str => {
    const arr = str.match(/^.*(?=:)|\d+/g)
    const label = arr.shift()
    const test = n => isBetween(n, +arr[0], +arr[1]) || isBetween(n, +arr[2], +arr[3])
    return {label, test}
}

const parseNotes = (list) => {
    const rules = list[0].split(/\r\n/g).map(ruleStr => parseRule(ruleStr))
    const myTicket = parseTicket(list[1])
    const nearbyTickets = list[2].match(/(\d+,)+\d+/g).map(str => parseTicket(str))

    return { rules, myTicket, nearbyTickets }
}

// part 1
const findRuleViolations = dataSrc => {
    const {rules, nearbyTickets} = parseNotes(dataSrc)
    const failed = nearbyTickets.flat().filter(
        ticketProp => !rules.reduce(
            (passFail, { test }) => passFail || test(ticketProp), false
        )
    )
    return failed
}

const addViolations = dataSrc => findRuleViolations(dataSrc).reduce((sum, n) => sum + n, 0)

console.log(addViolations(data))

// part 2

const countTrue = col => col.reduce((t, val) => val ? t + 1 : t, 0)

const findDepartureRules = dataSrc => {
    const {rules, myTicket, nearbyTickets} = parseNotes(dataSrc)
    const violations = findRuleViolations(dataSrc)

    const validTickets = nearbyTickets.filter((ticket) => ticket.filter(ticketVal => violations.indexOf(ticketVal) !== -1 ).length === 0)

    const ticketCols = []
    validTickets.forEach((ticket, i) => {
        ticket.forEach(
            (ticketProp, j) => {
                if (i === 0) {
                    ticketCols[j] = []
                }
                ticketCols[j].push(ticketProp)
            }
        )
    })


    let passedRules = []
    rules.forEach((_, i) => passedRules[i] = [])
    rules.forEach(({ label, test }, i) => {
        ticketCols.forEach(
            (col, j) => {
                const rulePassed = col.reduce((sum, row) => test(row) ? sum + 1 : sum, 0) === validTickets.length
                if (rulePassed) {
                    passedRules[j].push(label)
                }
            }
        )
    })
    const removed = []
    do {
        const removal = passedRules.find( labels => labels.length === 1 && removed.indexOf(labels[0]) === -1)
        removed.push(removal[0])
        passedRules.forEach( labels => {
            if (labels.length > 1) {
                labels.splice(labels.indexOf(removal[0]), 1)
            }
        })
    } while (passedRules.flat().length > passedRules.length)

    const prod = passedRules.map((rule, i) => /departure/.test(rule) ? myTicket[i] : 1).reduce((total, num) => num * total)

    return prod
}

console.log(findDepartureRules(data))
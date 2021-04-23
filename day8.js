const loadFile = require('./loadFile')
const data = loadFile('./data/day8.txt', { split: /\r\n/ })

const parseData = list => list.map(row => {
    const [ action, value ] = row.split(' ')
    return { action, value: +value, called: false, flipAction: false }
})

const getAction = (action, flip) => {
    if (!flip || action === 'acc') {
        return action
    }
    if (action === 'nop') {
        return 'jmp'
    } else if (action === 'jmp') {
        return 'nop'
    }
}

const startLoop = (data, flipPos) => {
    const actions = parseData(data)
    let total = 0
    let pos = 0
    let endLoop = false
    do {
        const command = actions[pos]
        if (command.called) {
            endLoop = true
            break
        }
        command.called = true
        const action = getAction(command.action, pos === flipPos)
        switch (action) {
            case 'acc':
                total += command.value
            case 'nop':
                pos += 1
                break
            case 'jmp':
                pos += command.value
        }

        if (flipPos !== -1 && pos === actions.length - 1) {
            endLoop = true
        }
    } while (!endLoop)

    return {total, isLast: pos === actions.length - 1}
}

// part 1
console.log(startLoop(data, -1).total)

// part 2
const findBug = () => data.reduce((total, _, i) => {
        const result = startLoop(data, i)
        return result.isLast ? result.total : total
    }, 0)

console.log(findBug())
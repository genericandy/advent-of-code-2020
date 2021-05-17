const loadFile = require("./loadFile")
const data = loadFile("./data/day14.txt", { split: /\r\n/ })

// part 1
const parseCommand = (command) => {
    if (/^mask.+/.test(command)) {
        return {
            action: 'mask',
            mask: command.match(/^mask = (.*)/)[1]
        }
    } else {
        const nums = command.match(/\d+/g)
        return {
            action: 'write',
            pos: +nums[0],
            val: +nums[1]
        }
    }
}

const write = (val, mask) => {
    val = val.toString(2).padStart(mask.length, 0)
    const maskedVal = Array.from(mask).reduce((str, ltr, i) => str + (ltr === 'X' ? val[i] : ltr), '')
    return parseInt(maskedVal, 2)
}

const processV1Commands = (commands) => {
    let mask = ''
    let addresses = []
    commands.forEach(
        (commandString) => {
            const command = parseCommand(commandString)
            if  ( command.action === 'mask' ) {
                mask = command.mask
            } else {
                addresses[command.pos] = write(command.val, mask)
            }
        })
    return addresses.reduce((sum, val) => sum + val, 0)
}

console.log(processV1Commands(data))

// part 2
const applyMask = (mask, pos) => {
    return parseInt(maskedVal, 2)
}

const getAllPositions = (mask, pos) => {
    binPos = pos.toString(2).padStart(mask.length, 0)
    
    const maskedPos = Array.from(mask).reduce(
        (str, ltr, i) => {
            if (ltr === '1') {
                return str + 1
            }
            if (ltr === '0') {
                return str + binPos[i]
            }
            return str + 'X'
        }, '')

    let numX = maskedPos.match(/X/g).length
    let i = 0
    const xPatterns = []
    do {
        xPatterns.push(i.toString(2).padStart(numX, 0).split(''))
    } while (++i < Math.pow(2, numX)) 
    return xPatterns.map(
        (xPattern, i) => xPattern.reduce(
            (newPos, x) => newPos.replace('X', x),
            maskedPos
        )
    )
}

const processV2Commands = commands => {
    let mask = ''
    let addresses = new Map()
    commands.forEach(
        (commandString) => {
            const command = parseCommand(commandString)
            if  ( command.action === 'mask' ) {
                mask = command.mask
            } else {
                const positions = getAllPositions(mask, command.pos)
                positions.forEach(position => {
                    addresses.set(parseInt(position, 2), command.val)
                })
            }
        })
    let sum = 0
    addresses.forEach((val) => sum += val)
    return sum
}
console.log(processV2Commands(data))
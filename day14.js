const loadFile = require('./loadFile')
const data = loadFile('./data/day14.txt', { split: /\r\n/ })

// part 1
const parseData = (list) => {
    let programs = []
    let program = {}
    list.forEach(row => {
        if (/^mask.+/.test(row)) {
            program = {
                mask: row.match(/^mask = (.*)/)[1],
                commands: []
            }
            programs.push(program)
        } else {
            const nums = row.match(/\d+/g)
            program.commands.push({
                pos: +nums[0],
                val: +nums[1]
            })
        }
    })

    console.log(programs[0])
}

parseData(data)
const loadFile = require('./loadFile')
const data = loadFile('./data/day13.txt', { split: /\r\n/ })

// part 1
const calcWait = (time, bus) => bus - time % bus

const findEarliestTime = (data) => {
    const time = +data[0]
    const buses = data[1].split(',').filter(bus => bus !== 'x').map(bus => +bus)
    const bus = buses.reduce((lowest, bus, i) => !i || (calcWait(time, bus) < calcWait(time, lowest)) ? bus : lowest, -1)
    return bus * calcWait(time, bus)
}

console.log(findEarliestTime(data))

// part 2
const findSequencedTimes = (data) => {
    const buses = data[1].split(',').map((bus, i) => ({offset: i, bus: bus == 'x' ? bus: +bus})).filter(({bus}) => bus !== 'x')
    const time = buses.reduce(({inc, time,}, { offset, bus }, i) => {
        if (!i) {
            return { inc: bus, time: 0}
        }
        while ((time + offset) % bus) {
            time += inc
        }
        return {inc: inc * bus, time}
    }, { inc: 0, time: 0})

    return time
}

console.log(findSequencedTimes(data))

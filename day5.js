const loadFile = require('./loadFile')
const data = loadFile('./data/day5.txt', { split: /\r\n/ })


const calcSeat = (str) => parseInt(str.replace(/F|L/g, 0).replace(/B|R/g, 1), 2)

const seats = data.map(calcSeat)

// part 1
console.log(Math.max(...seats))

// part 2
const sortedSeats = seats.sort((a,b) => a-b)
const missingSeat = seats.find((seatNum, i) => i > 0 && sortedSeats[i-1] === seatNum - 2) - 1
console.log(missingSeat)
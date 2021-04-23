const loadFile = require('./loadFile')
const data = loadFile('./data/day11.txt', { split: /\r\n/ })

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

// part 1

const processData = (arr) => arr.map( str => str.split(''))

const getSeat = (seats, row, col) => seats[row] && seats[row][col]

// part 1
const iterateAdjacentSeats = rows => rows.map(
    (row, r) => row.map((col, c) => {
        if (col === FLOOR) {
            return col
        }
        const seat = col
        const testRows = [ 
            getSeat( rows, r - 1, c - 1),
            getSeat( rows, r - 1, c),
            getSeat( rows, r - 1, c + 1),
            getSeat( rows, r, c - 1),
            getSeat( rows, r, c + 1),
            getSeat( rows, r + 1, c - 1),
            getSeat( rows, r + 1, c),
            getSeat( rows, r + 1, c + 1)
        ]
        if (col === EMPTY && testRows.indexOf(OCCUPIED) === -1) {
            return OCCUPIED
        }

        if (col === OCCUPIED && testRows.filter(seat => seat === OCCUPIED).length >= 4) {
            return EMPTY
        }

        return seat
    })
)

const resolveAdjacentSeats = (list) => {
    let seats = processData(list)
    let newSeats =  iterateAdjacentSeats(seats)
    do {
        [seats, newSeats] = [newSeats,  iterateAdjacentSeats(newSeats)]
    } 
    while (seats.flat().join('') !== newSeats.flat().join('')) 
    return newSeats.flat().filter(seat => seat === OCCUPIED).length
}

console.table(resolveAdjacentSeats(data))

// part 2
const getDirectionalSeat = (seats, pos, dir) => {
    const nextSeat = getSeat(seats, pos.r + dir.r, pos.c + dir.c )

    if (nextSeat !== FLOOR) {
        return nextSeat
    }

    return getDirectionalSeat(
        seats,
        { r: pos.r + dir.r, c: pos.c + dir.c},
        dir
    )
}

const iterateDirectionalSeats = rows => rows.map(
    (row, r) => row.map((col, c) => {
        if (col === FLOOR) {
            return col
        }
        const seat = col
        const testRows = [ 
            getDirectionalSeat( rows, { r, c }, { r: -1, c: -1}),
            getDirectionalSeat( rows, { r, c }, { r: -1, c: 0}),
            getDirectionalSeat( rows, { r, c }, { r: -1, c: 1}),
            getDirectionalSeat( rows, { r, c }, { r: 0, c: -1}),
            getDirectionalSeat( rows, { r, c }, { r: 0, c: 1}),
            getDirectionalSeat( rows, { r, c }, { r: 1, c: -1}),
            getDirectionalSeat( rows, { r, c }, { r: 1, c: 0}),
            getDirectionalSeat( rows, { r, c }, { r: 1, c: 1})
        ]
        if (col === EMPTY && testRows.indexOf(OCCUPIED) === -1) {
            return OCCUPIED
        }

        if (col === OCCUPIED && testRows.filter(seat => seat === OCCUPIED).length >= 5) {
            return EMPTY
        }

        return seat

    })
)

const resolveDirectionalSeats = (list) => {
    let seats = processData(list)
    let newSeats =  iterateDirectionalSeats(seats)
    do {
        [seats, newSeats] = [newSeats,  iterateDirectionalSeats(newSeats)]
    } 
    while (seats.flat().join('') !== newSeats.flat().join('')) 
    return newSeats.flat().filter(seat => seat === OCCUPIED).length
}

console.log(resolveDirectionalSeats(data))
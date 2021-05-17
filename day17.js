const loadFile = require("./loadFile")
const data = loadFile("./data/day17.txt", { split: /\r\n/g })

const ON = '#'
const OFF = '.'

// part 1

const setPos = (grid, x, y, z, val) => grid.set(`${x}_${y}_${z}`, val)
const getPos = (grid, x, y, z) => grid.get(`${x}_${y}_${z}`)

const createGrid = (list, iterations) => {
    const grid = new Map()
    const expansion = iterations * 2
    const dimensions = {
        x: list[0].length + expansion,
        y: list.length + expansion,
        z: 1 + expansion
    }

    for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
            for (let z = 0; z < dimensions.z; z++) {
                setPos(grid, x, y, z, '.')
            }
        }
    }
    
    for (let x = 0; x < list[0].length; x++) {
        for (let y = 0; y < list.length; y++) {
            setPos(grid, iterations + x, iterations + y, iterations, list[x][y])
        }
    }

    return { grid, dimensions }
}

const getNeighbors = (grid, cx, cy, cz) => {
    const neighbors = []
    
    for (let x = cx - 1; x <= cx + 1; x++) {
        for (let y = cy - 1; y <= cy + 1; y++) {
            for (let z = cz - 1; z <= cz + 1; z++) {
                if (x === cx && y === cy && z === cz) {
                    continue
                }
                neighbors.push(getPos(grid, x, y, z))
            }
        }
    }

    return neighbors
}

const iterateGrid = (grid) => {
    const newGrid = new Map()
    const srcGrid = grid.grid
    for (let x = 0; x < grid.dimensions.x; x++) {
        for (let y = 0; y < grid.dimensions.y; y++) {
            for (let z = 0; z < grid.dimensions.z; z++) {
                const neighbors = getNeighbors(srcGrid, x, y, z)
                const numActiveNeighors = neighbors.filter( pos => pos === ON).length
                const pos = getPos(srcGrid, x, y, z)
                if (pos === ON && (numActiveNeighors < 2 || numActiveNeighors > 3)) {
                    setPos(newGrid, x, y, z, OFF)
                } else if (pos === OFF && numActiveNeighors === 3) {
                    setPos(newGrid, x, y, z, ON)
                } else {
                    setPos(newGrid, x, y, z, pos)
                }
            }
        }
    }

    grid.grid = newGrid
}

const logSlice = ({grid, dimensions}, z) => {
    const xs = []
    for (let x = 0; x < dimensions.x; x++) {
        xs.push([])
        for (let y = 0; y < dimensions.y; y++) {
            xs[x].push(getPos(grid, x, y, z))
        }
    }
    console.table(xs);
}


const runPart1 = (list, iterations) => {
    const grid = createGrid(list, iterations)

    for (let i = 0; i < iterations; i++) {
        iterateGrid(grid)
    }

    let numOn = 0

    for (let pos of grid.grid.values()) {
        if (pos === ON) {
            numOn++
        }
    }
    return numOn
}

console.log(runPart1(data, 6))

// part 2

const setPos4d = (grid, x, y, z, w, val) => grid.set(`${x}_${y}_${z}_${w}`, val)
const getPos4d = (grid, x, y, z, w) => grid.get(`${x}_${y}_${z}_${w}`)

const createGrid4d = (list, iterations) => {
    const grid = new Map()
    const expansion = iterations * 2
    const dimensions = {
        x: list[0].length + expansion,
        y: list.length + expansion,
        z: 1 + expansion,
        w: 1 + expansion
    }

    for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
            for (let z = 0; z < dimensions.z; z++) {
                for (let w = 0; w < dimensions.w; w++) {
                    setPos4d(grid, x, y, z, w, '.')
                }
            }
        }
    }

    for (let x = 0; x < list[0].length; x++) {
        for (let y = 0; y < list.length; y++) {
            setPos4d(grid, iterations + x, iterations + y, iterations, iterations, list[x][y])
        }
    }

    return { grid, dimensions }
}

const getNeighbors4d = (grid, cx, cy, cz, cw) => {
    const neighbors = []
    
    for (let x = cx - 1; x <= cx + 1; x++) {
        for (let y = cy - 1; y <= cy + 1; y++) {
            for (let z = cz - 1; z <= cz + 1; z++) {
                for (let w = cw - 1; w <= cw + 1; w++) {
                    if (x === cx && y === cy && z === cz && w === cw) {
                        continue
                    }
                    neighbors.push(getPos4d(grid, x, y, z, w))
                }
            }
        }
    }

    return neighbors
}

const iterateGrid4d = (grid) => {
    const newGrid = new Map()
    const srcGrid = grid.grid
    for (let x = 0; x < grid.dimensions.x; x++) {
        for (let y = 0; y < grid.dimensions.y; y++) {
            for (let z = 0; z < grid.dimensions.z; z++) {
                for (let w = 0; w < grid.dimensions.w; w++) {
                    const neighbors = getNeighbors4d(srcGrid, x, y, z, w)
                    const numActiveNeighors = neighbors.filter( pos => pos === ON).length
                    const pos = getPos4d(srcGrid, x, y, z, w)
                    if (pos === ON && (numActiveNeighors < 2 || numActiveNeighors > 3)) {
                        setPos4d(newGrid, x, y, z, w, OFF)
                    } else if (pos === OFF && numActiveNeighors === 3) {
                        setPos4d(newGrid, x, y, z, w, ON)
                    } else {
                        setPos4d(newGrid, x, y, z, w, pos)
                    }
                }
            }
        }
    }

    grid.grid = newGrid
}

const runPart2 = (list, iterations) => {
    const grid = createGrid4d(list, iterations)

    for (let i = 0; i < iterations; i++) {
        iterateGrid4d(grid)
    }

    let numOn = 0

    for (let pos of grid.grid.values()) {
        if (pos === ON) {
            numOn++
        }
    }
    return numOn
}

console.log(runPart2(data, 6))
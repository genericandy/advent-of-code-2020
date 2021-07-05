const loadFile = require("./loadFile")
const data = loadFile("./data/day24.txt", { split: /\r\n/g })

const DirVals = {
    w: { x: -1, y: 0},
    sw: { x: -0.5, y: 1},
    nw: { x: -0.5, y: -1},
    e: { x: 1, y: 0},
    se: { x: 0.5, y: 1},
    ne: { x: 0.5, y: -1},
}

const parseRoute = str => str.match(/((s|n)?(e|w))/g)

const followRoute = route => {
    let pos = { x: 0, y: 0 }
    while (route.length) {
        const step = route.shift()
        const stepVals = DirVals[step]
        pos.x += stepVals.x
        pos.y += stepVals.y
    }

    return pos
}

const blackTiles = new Set()

const solve1 = () => {
    const routes = data.map(parseRoute)
    const positions = routes.map(followRoute).map( pos => `${pos.x} ${pos.y}`)
    positions.forEach(pos => {
        if (blackTiles.has(pos)) {
            blackTiles.delete(pos)
        } else {
            blackTiles.add(pos)
        }
    });
}

const getTile = (x,y) => ({
    color: blackTiles.has(`${x} ${y}`) ? 'black' : 'white',
    tileId: `${x} ${y}`
})

const getNeighbors = (tile) => {
    const [x, y] = tile.split(' ').map(n => +n)
    return [
        getTile(x + 1, y),
        getTile(x + 0.5, y - 1),
        getTile(x + 0.5, y + 1),
        getTile(x - 1, y),
        getTile(x - 0.5, y - 1),
        getTile(x - 0.5, y + 1),
    ]
}

const solve2 = () => {

    let numMoves = 100

    while (numMoves--) {
        const removals = new Set()
        const additions = new Set()
        const blackTilesArr =  [...blackTiles]

        blackTilesArr.forEach(blackId => {
            const neighbors = getNeighbors(blackId)
            const numBlackNeighbors = neighbors.filter(({ color }) => color === 'black').length
            if (numBlackNeighbors === 0 || numBlackNeighbors > 2) {
                removals.add(blackId)
            }

            const whiteTiles = neighbors.filter(({ color }) => color === 'white')

            whiteTiles.forEach(({tileId}) => {
                const numBlackNeighbors2 = getNeighbors(tileId).filter(({ color }) => color === 'black').length
                if (numBlackNeighbors2 === 2) {
                    additions.add(tileId)
                }
            })
        })
            
        removals.forEach(id => blackTiles.delete(id))
        additions.forEach(id => blackTiles.add(id))
    }

    console.log(blackTiles.size)
}

solve1()
solve2()

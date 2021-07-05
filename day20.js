const loadFile = require("./loadFile")
const data = loadFile("./data/day20.txt", { split: /\r\n\r\n/g })
const VER = 'vertical'
const HOR = 'horizontal'

const parseTile = (srcStr) => {
    let pattern = srcStr.split(/\r\n/)
    const tileNum = /\d+/.exec(pattern.shift())[0]
    pattern = pattern.map(row => row = row.split(''))
    const borders = getBorders(pattern)
    return {
        pattern,
        borders,
        tileNum,
        neighbors: [],
        positioned: false
    }
}

const getBorders = pattern =>  ([
    pattern[0].join(''),
    pattern.map( row => row.slice(-1)[0]).join(''),
    pattern.slice(-1)[0].join(''),
    pattern.map( row => row[0]).join('')
])

const findNeighbors = (tile, allTiles) => {
    if (tile.positioned) {
        return
    }

    tile.positioned = true
    tile.borders.forEach((border, borderPos) => {
        const reverseBorder = border.split('').reverse().join('')
        allTiles.forEach(neighbor => {
            if (neighbor.tileNum === tile.tileNum || tile.neighbors[borderPos] ) {
                return
            }

            let neighborPos = neighbor.borders.indexOf(border)
            if (neighborPos === -1) {
                neighborPos = neighbor.borders.indexOf(reverseBorder)
            }

            if (neighborPos === -1) {
                return
            }

            while (Math.abs(borderPos - neighborPos) !== 2) {
                rotateTile(neighbor)
                neighborPos = (neighborPos + 1) % 4
            }

            if (tile.borders[borderPos] !== neighbor.borders[neighborPos]) {
                flipTile(neighbor, neighborPos % 2 ? VER : HOR)
            }

            tile.neighbors[borderPos] = neighbor
            neighbor.neighbors[neighborPos] = tile
        })
    })

    tile.neighbors.forEach(
        neighbor => neighbor && findNeighbors(neighbor, allTiles)
    )
}

const flipTile = (tile, direction) => {
    let { pattern } = tile
    if (direction === VER) {
        pattern.reverse()
    } else {
        pattern = pattern.map(row => row.reverse())
    }
    tile.pattern = pattern
    tile.borders = getBorders(pattern)
}

const rotatePattern = (pattern) => {
    const tileW = pattern.length
    const newPattern  = pattern.map((row) => [])
    pattern.forEach(
        (row, r) => row.forEach(
            (col, c) => {
                newPattern[c][tileW - r - 1] = col
            }
        )
    )
    return newPattern
}

const rotateTile = (tile) => {
    let { pattern } = tile
    const newPattern  = rotatePattern(pattern)
    tile.pattern = newPattern
    tile.borders = getBorders(newPattern)
}

const findCorners = (tiles) => {
    findNeighbors(tiles[0], tiles)

    const corners = tiles.filter(({ neighbors }) => {
        const uniqueBorders = neighbors.reduce(
            (total, neighbor) => neighbor ? total + 1 : total,
            0
        )
        return uniqueBorders === 2
    })

    return corners
}

const sortTiles = (tiles, firstTile) => {
    let result = []
    let tilesAdded = 0
    let tile = firstTile
    let sortedRow = []

    while (tilesAdded < tiles.length) {
        sortedRow.push(tile)
        tilesAdded++
        if (tile.neighbors[1]) {
            tile = tile.neighbors[1]
        } else {
            tile = tile.neighbors[2] && sortedRow[0].neighbors[2]
            result.push(sortedRow)
            sortedRow = []
        }
    }

    return result
}

const solvePuzzle1 = () => findCorners(data.map(parseTile)).reduce((prod, { tileNum }) => prod * tileNum, 1)
console.log(solvePuzzle1())

const serpent = [
    /(.{18})#(.)/g,
    /#(....)##(....)##(....)###/g,
    /(.)#(..)#(..)#(..)#(..)#(..)#(...)/g
]

const removeBorders = ({ pattern }) => {
    pattern.shift()
    pattern.pop()
    pattern.forEach(row => {
        row.shift()
        row.pop()
    })
}

const rotateImage = (pattern) => {
    const tileW = pattern.length
    const newPattern  = pattern.map((row) => [])
    pattern.forEach(
        (row, r) => row.split('').forEach(
            (col, c) => {
                newPattern[c][tileW - r - 1] = col
            }
        )
    )
    return newPattern.map( row => row.join(''))
}

const buildImage = rows => {
    const image = []

    rows.forEach( (row, rowNum) => {
        row.forEach(({ pattern }) => {
            pattern.forEach((patternRow, patternRowNum) => {
                const imageRowNum = rowNum * pattern.length + patternRowNum
                image[imageRowNum] = image[imageRowNum] ? image[imageRowNum] + patternRow.join('') : patternRow.join('')
            })
        })
    })
    return image
}

const replaceRow = (row, index, regex, replacement) => row.slice(0, index) 
    + row.slice(index, index + 20).replace(regex, replacement)
    + row.slice(index + 20)

const findSerpents = (image) => {
    let matches = 0

    image.forEach( (row, rowNum) => {
        if (rowNum >= image.length - 2) {
            return false
        }

        let index = row.search(serpent[0])

        while (index < row.length - 20 && index !== -1) {
            const row1 = image[rowNum]
            const row2 = image[rowNum + 1]
            const row3 = image[rowNum + 2]
            const row1Index = row1.slice(index).search(serpent[0])
            const row2Index = row2.slice(index).search(serpent[1])
            const row3Index = row3.slice(index).search(serpent[2])
            if (row1Index === 0 && row2Index === 0 && row3Index === 0) {
                image[rowNum] = replaceRow(row1, index, serpent[0], '$1O$2')
                image[rowNum + 1] = replaceRow(row2, index, serpent[1], 'O$1OO$2OO$3OOO')
                image[rowNum + 2] = replaceRow(row3, index, serpent[2], '$1O$2O$3O$4O$5O$6O$7') 
                matches++
                index += 20
            } else {
                index++
            }
        }
    })

    return matches
}

const solvePuzzle2 = () => {
    const tiles = data.map(parseTile)
    const firstCorner = findCorners(tiles).find(
        ({ neighbors }) => !neighbors[0] && !neighbors[3]
    )
    const sortedTiles = sortTiles(tiles, firstCorner)
    sortedTiles.flat().forEach(removeBorders)

    let image = buildImage(sortedTiles)
    image = rotateImage(rotateImage(image.reverse()))

    findSerpents(image)

    return image.reduce((total, row) => total + row.match(/#/g).length, 0)
}

console.log(solvePuzzle2())
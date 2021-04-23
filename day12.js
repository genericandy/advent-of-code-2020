const loadFile = require('./loadFile')
const data = loadFile('./data/day12.txt', { split: /\r\n/ })

const directions = ['N', 'E', 'S', 'W']
const dirToDeg = dir => directions.indexOf(dir) * 90
const degToDir = deg => directions[(deg + 360)%360/90]

// part 1
const processNavCommand = ({ y, x, dir }, action, amt) => {
    if (action === 'F') {
        return processNavCommand({ y, x, dir }, dir, amt)
    }

    if (action === 'N') {
        y += amt
    } else if (action === 'S') {
        y -= amt
    } else if (action === 'E') {
        x += amt
    } else if (action === 'W') {
        x -= amt
    } else if (action === 'L') {
        dir = degToDir(dirToDeg(dir) + -amt)
    } else if (action === 'R') {
        dir = degToDir(dirToDeg(dir) + amt)
    }
    return { y, x, dir }
}

const getNavManhattanDistance = list => {
    const {y, x} = list.reduce( (res, instruction) => {
        const [_, action, dist ] = /(\w)(\d+)/.exec(instruction)
        return processNavCommand(res, action, +dist)
    }, {y: 0, x: 0, dir: 'E'})
    return Math.abs(y) + Math.abs(x)
}

console.log(getNavManhattanDistance(data))

// part 2

const rotateWaypoint = (wpX, wpY, amt) => {
    if (amt === 180) {
        return [-wpX, -wpY]
    } else if (amt === 270) {
        return [-wpY, wpX]
    } else if (amt === 90) {
        return [wpY, -wpX]
    }
    return [wpX, wpY]
}

const processWaypointCommand = ({ x, y, wpX, wpY }, action, amt) => {
    if (action === 'F') {
        x += amt * wpX
        y += amt * wpY
    } else 0if (action === 'N') {
        wpY += amt
    } else if (action === 'S') {
        wpY -= amt
    } else if (action === 'E') {
        wpX += amt
    } else if (action === 'W') {
        wpX -= amt
    } else if (action === 'L') {
        [wpX, wpY] = rotateWaypoint(wpX, wpY, 360 - amt)
    } else if (action === 'R') {
        [wpX, wpY] = rotateWaypoint(wpX, wpY, amt)
    }

    return { x, y, wpX, wpY }
}

const getWaypointManhattanDistance = list => {
    const {y, x} = list.reduce( (res, instruction) => {
        const [_, action, dist ] = /(\w)(\d+)/.exec(instruction)
        return processWaypointCommand(res, action, +dist)
    }, {y: 0, x: 0, wpX: 10, wpY: 1 })
    return Math.abs(y) + Math.abs(x)
}
console.log(getWaypointManhattanDistance(data))
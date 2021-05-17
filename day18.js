const loadFile = require("./loadFile")
const data = loadFile("./data/day18.txt", { split: /\r\n/g })


const solveParens = (str, caller) => {
    let parenBlocks
    while (parenBlocks = str.match(/\([^\(\)]+\)/g)) {
        str = parenBlocks.reduce( 
            (res, parenStr) => res.replace(
                parenStr, 
                caller( parenStr.match(/[^\(\)]+/)[0] )
            ), str
        )
    }
    return str
}


// part 1
const solveString = str => {
    str = solveParens(str, solveString)

    const sumProd = str.match(/[\d+\+\*]+/g).reduce(
        ({ total, operand}, char) => {
            if (isNaN(char)) {
                return { total, operand: char}
            } else {
                return {
                    total: operand === '+' ? +char + total : +char * total
                }
            }
        },
        { total: 0, operand: '+'}
    )

    return sumProd.total
}

const calculateListSum = list => list.map(solveString).reduce((total, val) => total + val, 0)

console.log(calculateListSum(data))


// part 2
const solveString2 = str => {
    str = solveParens(str, solveString2)

    let addBlock
    while (addBlock = str.match(/(\d+) \+ (\d+)/)) {
        str = str.replace(addBlock[0], +addBlock[1] + +addBlock[2] )
    }
    
    const prod = str.match(/\d+/g).reduce((total, char) => +char * total, 1)
    return prod
}

const calculateListSum2 = list => list.map(solveString2).reduce((total, val) => total + val, 0)

console.log(calculateListSum2(data))
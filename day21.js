const loadFile = require("./loadFile")
const data = loadFile("./data/day21.txt", { split: /\r\n/g })


const parseFood = str => {
    const ingredients = str.match(/\w+(?<!\(.+)/g)
    const allergens = str.match(/(?<=\(contains )(.*?)(?=\))/g)[0].split(', ')
    return { ingredients, allergens }
}

const solve = () => {
    const allIngredients = new Map()
    const food = data.map(parseFood)
    const allergenMap = new Map()
    food.forEach(({ ingredients, allergens }) => {
        allergens.forEach( allergen => {
            if (!allergenMap.has(allergen)) {
                allergenMap.set(
                    allergen,
                    {
                        ingredients: new Map(),
                        listed: 1,
                        match: ''
                    }
                )
            } else {
                allergenMap.get(allergen).listed++
            }
            ingredients.forEach(ingredient => {
                const ingMap = allergenMap.get(allergen).ingredients
                ingMap.set(ingredient, ingMap.has(ingredient) ? ingMap.get(ingredient) + 1 : 1)
            })
        })
        ingredients.forEach(ingredient => {
            allIngredients.set(ingredient, allIngredients.has(ingredient) ? allIngredients.get(ingredient) + 1 : 1)
        })
    });

    allergenMap.forEach(({ingredients, listed}) => {
        ingredients.forEach((num, key) => {
            if (num < listed) {
                ingredients.delete(key)
            }
        })
    })

    const allergenArr = [...allergenMap.entries()]
    let singleAllergen = allergenArr.find(allergen => allergen[1].ingredients.size === 1)

    while (singleAllergen) {
        const allergenKey = singleAllergen[1].ingredients.keys().next().value
        allergenMap.get(singleAllergen[0]).match = allergenKey
        allIngredients.delete(allergenKey)
        allergenMap.forEach(({ ingredients }) => ingredients.delete(allergenKey))
        singleAllergen = allergenArr.find(allergen => allergen[1].ingredients.size === 1)
    }

    // part 1
    console.log([...allIngredients.values()].reduce((total, num) => total + num, 0))

    // part 2
    const dangerList = allergenArr.sort((a, b) => a[0] > b[0] ? 1 : -1).map(allergen => allergen[1].match)

    console.log(dangerList.join(','))
}

solve()
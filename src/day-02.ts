import { splitLines } from "./utils"

type CubeCollection = {
    red: number
    green: number
    blue: number
}

export type Bag = CubeCollection

export type Game = {
    id: number
    rounds: CubeCollection[]
}

export const parseGame = (line: string): Game => {
    const id: number = parseGameId(line)
    const rounds: CubeCollection[] = line.split(':')[1].split(';').map((str) => {
        return parseCubes(str)
    })

    return { id: id, rounds: rounds }
}

export const parseGameId = (line: string): number => {
    const match = /Game (\d+):/g.exec(line)
    if (match) {
        return parseInt(match[1])
    }

    throw 'no match'
}

export const parseCubes = (input: string): { red: number, green: number, blue: number } => {
    const findCubeCount = (color: string): number => {
        const re = new RegExp(`(\\d+) ${color}`, "g")
        const match = re.exec(input)
        if (match) {
            return parseInt(match[1])
        }

        return 0
    }

    return {
        red: findCubeCount('red'),
        green: findCubeCount('green'),
        blue: findCubeCount('blue')
    }
}

export const calculateFewestRequiredCubes = (game: Game): CubeCollection => {
    return game.rounds.reduce((prev, curr): CubeCollection => {
        return { 
            red: Math.max(prev.red, curr.red),
            green: Math.max(prev.green, curr.green),
            blue: Math.max(prev.blue, curr.blue),
        }
    }, { red: 0, green: 0, blue: 0})
}

export const filterPossibleGames = (games: Game[], bag: Bag): Game[] => {
    return games.filter((game) => {
        const maxes = calculateFewestRequiredCubes(game)
        const result = ( maxes.red <= bag.red && maxes.green <= bag.green && maxes.blue <= bag.blue )
        return result
    })
}

export const calculateGamePower = (game: Game): number => {
    const cubes = calculateFewestRequiredCubes(game)
    return (cubes.red * cubes.green * cubes.blue)
}

export const partOne = (bag: Bag, gameInput: string): number => {
    const games: Game[] = splitLines(gameInput).map((line) => {
        return parseGame(line)
    })

    const possible = filterPossibleGames(games, bag)
    return possible.map((game) => game.id).reduce((previous, current) => (current + previous), 0)
}

export const partTwo = (gameInput: string): number => {
    const sumOfPowerValues = splitLines(gameInput).map((line) => {
        return calculateGamePower(parseGame(line))
    }).reduce((prev, curr) => (prev + curr), 0)

    return sumOfPowerValues
}
import { splitLines } from "./utils"

type Location = { location: number, length: number }
type PartNumber = { part: number, location: Location }
type Gear = { ratio: number[], location: Location }

const findMatchingNumbers = (input: string, regex: RegExp): PartNumber[] => {
    const results: PartNumber[] = []

    let result
    while ((result = regex.exec(input)) != null) {
        results.push({ part: parseInt(result[1]), location: { location: result.index, length: result[1].length } })
    }

    return results
}

const findSymbolLocations = (input: string): Location[] => {
    const results: Location[] = []

    input.split('').forEach((substr, index) => {
        if (!stringIsDigit(substr) && substr !== '.') {
            results.push({ location: index, length: 1 })
        }
    })

    return results
}

export const findGearsSymbols = (input: string): Location[] => {
    const results: Location[] = []

    input.split('').forEach((substr, index) => {
        if (substr === '*') {
            results.push({ location: index, length: 1 })
        }
    })

    return results
}

const stringIsDigit = (str: string): boolean => {
    return (str[0] >= '0' && str[0] <= '9')
}

export const locationsOverlapOrAreAdjacent = (a: Location, b: Location): boolean => {
    return ((a.location + 1) >= b.location && (a.location <= (b.location + b.length))) ||
        ((b.location + 1) >= a.location && (b.location <= (a.location + a.length)))
}

export const findPartNumbers = (input: string): number[] => {
    let results: number[] = []
    const lines = splitLines(input)

    let prevLine = '.'.repeat(lines[0].length)
    let nextLine = ''
    lines.forEach((currentLine, lineIndex, arr) => {
        nextLine = (((lineIndex + 1) >= arr.length) ? '.'.repeat(currentLine.length) : arr[lineIndex + 1]).repeat(1)

        if (nextLine.length != currentLine.length || prevLine.length != currentLine.length) {
            console.error('invalid line length (prev, current, next)', prevLine.length, currentLine.length, nextLine.length)
            throw 'assuming all lines are the same length!'
        }

        const symbols = findSymbolLocations(currentLine)
            .concat(findSymbolLocations(prevLine))
            .concat(findSymbolLocations(nextLine))
        const allPartNumbers = findMatchingNumbers(currentLine, new RegExp("(\\d+)", "g"))

        // filter part numbers that have adjacent symbols
        const partNumbers = allPartNumbers.filter((p) => {
            return (symbols.filter((s) => locationsOverlapOrAreAdjacent(s, p.location)).length > 0)
        })

        results = results.concat(partNumbers.map((p) => p.part))

        prevLine = currentLine.repeat(1)
    })

    return results
}

export const findGears = (input: string): Gear[] => {
    let results: Gear[] = []
    const lines = splitLines(input)

    let prevLine = '.'.repeat(lines[0].length)
    let nextLine = ''
    lines.forEach((currentLine, lineIndex, arr) => {
        nextLine = (((lineIndex + 1) >= arr.length) ? '.'.repeat(currentLine.length) : arr[lineIndex + 1]).repeat(1)

        if (nextLine.length != currentLine.length || prevLine.length != currentLine.length) {
            console.error('invalid line length (prev, current, next)', prevLine.length, currentLine.length, nextLine.length)
            throw 'assuming all lines are the same length!'
        }

        const gearSymbols = findGearsSymbols(currentLine)
        const allPartNumbers = findMatchingNumbers(currentLine, new RegExp("(\\d+)", "g"))
            .concat(findMatchingNumbers(prevLine, new RegExp("(\\d+)", "g")))
            .concat(findMatchingNumbers(nextLine, new RegExp("(\\d+)", "g")))

        // filter part numbers that have adjacent symbols
        const validGears: Gear[] = gearSymbols.flatMap((gear) => {
            const ratioValues = allPartNumbers.filter((p) => locationsOverlapOrAreAdjacent(p.location, gear))
            if (ratioValues.length == 2) {
                return [{ ratio: ratioValues.map((r) => r.part), location: gear }]
            }

            return []
        })

        results = results.concat(validGears)
        prevLine = currentLine.repeat(1)
    })

    return results
}

export const partOne = (input: string): number => {
    return findPartNumbers(input).reduce((prev, curr) => (prev + curr))
}

export const partTWo = (input: string): number => {
    return findGears(input).map((g) => (g.ratio[0] * g.ratio[1])).reduce((prev, curr) => (prev + curr))
}
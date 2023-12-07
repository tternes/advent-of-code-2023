import { describe, expect, test } from '@jest/globals';
import { readDataFromFile } from './utils';
import { partOne, findPartNumbers, findGearsSymbols, locationsOverlapOrAreAdjacent, findGears, partTWo } from './day-03'

const sampleData = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const data = readDataFromFile('./day-03.data.txt')

describe('Part 1', () => {
    describe('Utils', () => {
        test('findPartNumbers validation', () => {
            expect(findPartNumbers(sampleData)).toStrictEqual([
                467, 35, 633, 617, 592, 755, 664, 598
            ])
        })

        test('locationsOverlapOrAreAdjacent validation', () => {
            // [..XX...]
            // [.X.....]
            expect(locationsOverlapOrAreAdjacent({ location: 2, length: 2 }, { location: 1, length: 1 })).toBe(true)

            // [...X...]
            // [.X.....]
            expect(locationsOverlapOrAreAdjacent({ location: 3, length: 1 }, { location: 1, length: 1 })).toBe(false)

            // [.XX....]
            // [.X.....]
            expect(locationsOverlapOrAreAdjacent({ location: 1, length: 2 }, { location: 1, length: 1 })).toBe(true)

            // [..X....]
            // [.X.....]
            expect(locationsOverlapOrAreAdjacent({ location: 2, length: 1 }, { location: 1, length: 1 })).toBe(true)

            // [..XX...]
            // [.....X.]
            expect(locationsOverlapOrAreAdjacent({ location: 2, length: 2 }, { location: 5, length: 1 })).toBe(false)

            // [XX.....]
            // [.....X.]
            expect(locationsOverlapOrAreAdjacent({ location: 0, length: 2 }, { location: 5, length: 1 })).toBe(false)

            // [XXXXX..]
            // [......X]
            expect(locationsOverlapOrAreAdjacent({ location: 0, length: 5 }, { location: 6, length: 1 })).toBe(false)

            // [.X.....]
            // [...XXX.]
            expect(locationsOverlapOrAreAdjacent({ location: 1, length: 1 }, { location: 3, length: 3 })).toBe(false)

            // [...X...]
            // [...XXX.]
            expect(locationsOverlapOrAreAdjacent({ location: 3, length: 1 }, { location: 3, length: 3 })).toBe(true)

            // 467..114..
            // ...*......
            expect(locationsOverlapOrAreAdjacent({ location: 0, length: 3 }, { location: 3, length: 1 })).toBe(true)
        })

        test('findGearsSymbols', () => {
            expect(findGearsSymbols('...*.......')).toStrictEqual([
                { location: 3, length: 1 },
            ])

            expect(findGearsSymbols('617*......')).toStrictEqual([
                { location: 3, length: 1 },
            ])

            expect(findGearsSymbols('...$.*....')).toStrictEqual([
                { location: 5, length: 1 },
            ])

            expect(findGearsSymbols('.*.$.*....')).toStrictEqual([
                { location: 1, length: 1 },
                { location: 5, length: 1 },
            ])

            expect(findGearsSymbols('012345678')).toStrictEqual([])
        })

        test('findGears validation', () => {
            expect(findGears(sampleData)).toStrictEqual([
                { ratio: [467, 35], location: { location: 3, length: 1 } },
                { ratio: [755, 598], location: { location: 5, length: 1 } }
            ])
        })
    })

    describe('Part 1 Solutions', () => {
        test('Sample', () => {
            expect(partOne(sampleData)).toBe(4361)
        })

        test('Data', () => {
            expect(partOne(data)).toBe(536202)
        })
    })

    describe('Part 2 Solutions', () => {
        test('Sample', () => {
            expect(partTWo(sampleData)).toBe(467835)
        })

        test('Data', () => {
            expect(partTWo(data)).toBe(78272573)
        })
    })
})
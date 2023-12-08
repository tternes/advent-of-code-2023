import { describe, expect, test } from '@jest/globals';
import { calculateValueOfNumbers, findWinningNumbers, parseCard, partOne, partTwo } from './day-04';
import { readDataFromFile } from './utils';

const sampleData = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const data = readDataFromFile('./day-04.data.txt')

describe('Day 4', () => {
    describe('Utils', () => {
        test('parseCard validation', () => {
            expect(parseCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toStrictEqual({
                id: 1,
                winning: [41, 48, 83, 86, 17],
                player: [83, 86, 6, 31, 17, 9, 48, 53]
            })

            expect(parseCard('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83')).toStrictEqual({
                id: 4,
                winning: [ 41, 92, 73, 84, 69 ],
                player: [ 59, 84, 76, 51, 58, 5, 54, 83 ]
            })
        })

        test('findWinningNumbers validation', () => {
            expect(findWinningNumbers({ id: 0, winning: [41, 48, 83, 86, 17], player: [83, 86, 6, 31, 17, 9, 48, 53] })).toStrictEqual([
                48, 83, 86, 17
            ])
        })

        test('calculateValueOfNumbers validation', () => {
            expect(calculateValueOfNumbers([48, 83, 17, 86])).toBe(8)
            expect(calculateValueOfNumbers([48, 83, 17])).toBe(4)
            expect(calculateValueOfNumbers([31, 61])).toBe(2)
            expect(calculateValueOfNumbers([84])).toBe(1)
            expect(calculateValueOfNumbers([])).toBe(0)
        })
    })

    describe('Part 1 Solutions', () => {
        test('Sample', () => {
            expect(partOne(sampleData)).toBe(13)
        })
        
        test('Data', () => {
            expect(partOne(data)).toBe(23235)
        })
    })

    describe('Part 2 Solutions', () => {
        test('Sample', () => {
            expect(partTwo(sampleData)).toBe(30)
        })
        
        test('Data', () => {
            expect(partTwo(data)).toBe(5920640)
        })
    })
})
import fs from 'fs'
import path from 'path'

import { describe, expect, test } from '@jest/globals';
import { partOne, partTwo } from './day-01';

const p1Sample = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const p2Sample = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const data = fs.readFileSync(path.resolve(__dirname, './day-01.data.txt'), 'utf8')



describe('Day 01', () => {
    describe('Part 1', () => {
        test('Sample', () => {
            expect(partOne(p1Sample)).toBe(142)
        })
    
        test('Data', () => {
            expect(partOne(data)).toBe(54159)
        })
    })

    describe('Part 2', () => {
        test('Sample', () => {
            expect(partTwo(p2Sample)).toBe(281)
        })

        test('Data', () => {
            expect(partTwo(data)).toBe(53866)
        })
    })
})

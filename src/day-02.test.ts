import fs from 'fs'
import path from 'path'

import { describe, expect, test } from '@jest/globals';
import { calculateFewestRequiredCubes, calculateGamePower, filterPossibleGames, parseCubes, parseGame, parseGameId, partOne, partTwo } from './day-02';

const sampleData = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

const data = fs.readFileSync(path.resolve(__dirname, './day-02.data.txt'), 'utf8')

describe('Day 02', () => {
    describe('Utils', () => {
        test('parseForId verification', () => {
            expect(parseGameId('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toBe(1)
            expect(parseGameId('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')).toBe(2)
            expect(parseGameId('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')).toBe(3)
            expect(parseGameId('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red')).toBe(4)
            expect(parseGameId('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toBe(5)

            expect(parseGameId('Game 100: 6 blue, 9 green; 3 green, 6 blue; 5 blue, 1 red')).toBe(100)
        })

        test('parseCubes verification', () => {
            expect(parseCubes('3 blue, 4 red')).toStrictEqual({ red: 4, green: 0, blue: 3 })
            expect(parseCubes('1 red, 2 green, 6 blue')).toStrictEqual({ red: 1, green: 2, blue: 6 })

            expect(parseCubes('8 green, 6 blue, 20 red')).toStrictEqual({ red: 20, green:8, blue: 6 })
        })

        test('parseGame verification', () => {
            expect(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toStrictEqual({
                id: 1,
                rounds: [
                    { red: 4, green: 0, blue: 3 },
                    { red: 1, green: 2, blue: 6 },
                    { red: 0, green: 2, blue: 0 },
                ]
            })
            expect(parseGame('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')).toStrictEqual({
                id: 2,
                rounds: [
                    { red: 0, green: 2, blue: 1 },
                    { red: 1, green: 3, blue: 4 },
                    { red: 0, green: 1, blue: 1 },
                ]
            })
            expect(parseGame('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toStrictEqual({
                id: 5,
                rounds: [
                    { red: 6, green: 3, blue: 1 },
                    { red: 1, green: 2, blue: 2 },
                ]
            })

            
            expect(parseGame('Game 100: 6 blue, 9 green; 3 green, 6 blue; 5 blue, 1 red')).toStrictEqual({
                id: 100,
                rounds: [
                    { red: 0, green: 9, blue: 6 },
                    { red: 0, green: 3, blue: 6 },
                    { red: 1, green: 0, blue: 5 },
                ]
            })
        })

        test('filterGames verification', () => {
            const bag = { red: 12, green: 13, blue: 14 }
            expect(filterPossibleGames([parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')], bag).length).toBe(1)
            expect(filterPossibleGames([parseGame('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')], bag).length).toBe(1)
            expect(filterPossibleGames([parseGame('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')], bag).length).toBe(0)
            expect(filterPossibleGames([parseGame('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red')], bag).length).toBe(0)
            expect(filterPossibleGames([parseGame('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')], bag).length).toBe(1)
        })

        describe('calculateFewestRequiredCubes verification', () => {
            expect(calculateFewestRequiredCubes(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'))).toStrictEqual({
                red: 4, green: 2, blue: 6
            })

            expect(calculateFewestRequiredCubes(parseGame('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'))).toStrictEqual({
                red: 1, green: 3, blue: 4
            })

            expect(calculateFewestRequiredCubes(parseGame('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'))).toStrictEqual({
                red: 20, green: 13, blue: 6
            })

            expect(calculateFewestRequiredCubes(parseGame('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'))).toStrictEqual({
                red: 14, green: 3, blue: 15
            })

            expect(calculateFewestRequiredCubes(parseGame('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'))).toStrictEqual({
                red: 6, green: 3, blue: 2
            })
        })

        describe('calculateGamePower verification', () => {
            expect(calculateGamePower(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'))).toBe(48)
            expect(calculateGamePower(parseGame('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'))).toBe(12)
            expect(calculateGamePower(parseGame('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'))).toBe(1560)
            expect(calculateGamePower(parseGame('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'))).toBe(630)
            expect(calculateGamePower(parseGame('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'))).toBe(36)
        })
    })

    describe('Part 1 Solutions', () => {
        test('Sample', () => {
            expect(partOne({ red: 12, green: 13, blue: 14 }, sampleData)).toBe(8)
        })

        test('Data', () => {
            expect(partOne({ red: 12, green: 13, blue: 14 }, data)).toBe(2720)
        })
    })

    describe('Part 2 Solutions', () => {
        test('Sample', () => {
            expect(partTwo(sampleData)).toBe(2286)
        })

        test('Data', () => {
            expect(partTwo(data)).toBe(71535)
        })
    })
})

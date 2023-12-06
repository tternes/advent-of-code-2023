import fs from 'fs'
import path from 'path'

export const splitLines = (input: string): string[] => {
    return input.trim().split('\n')
}

export const readDataFromFile = (filename: string): string => {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
}
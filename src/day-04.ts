import { splitLines } from "./utils"

type Card = {
    id: number,
    winning: number[],
    player: number[]
}

export const parseCard = (line: string): Card => {
    function splitNumberListString(str: string): number[] {
        return str.trim().split(' ').flatMap((v) => {
            const result = parseInt(v.trim())
            if (result) return [result]
            return []
        })
    }

    const match = /Card\s*(\d+):/g.exec(line)
    if (!match) {
        console.error('Line missing ID', line)
        throw new Error('invalid card data - missing ID')
    }

    const id = parseInt(match[1])
    const numberData = line.split(':')[1].split('|')
    const winning: number[] = splitNumberListString(numberData[0])
    const player: number[] = splitNumberListString(numberData[1])
    return { id, winning, player }
}

export const findWinningNumbers = (card: Card): number[] => {
    return card.winning.flatMap((w) => {
        if (card.player.indexOf(w) >= 0) return [w]
        return []
    })
}

export const calculateValueOfNumbers = (numbers: number[]): number => {
    switch (numbers.length) {
        case 0: return 0
        default: return Math.pow(2, numbers.length - 1)
    }
}

export const partOne = (input: string): number => {
    return splitLines(input).map((line) => {
        return calculateValueOfNumbers(findWinningNumbers(parseCard(line)))
    }).reduce((prev, curr) => (prev + curr))
}

export const partTwo = (input: string): number => {

    type CountedCard = {
        count: number,
        card: Card
    }

    const cards: CountedCard[] = splitLines(input)
        .map((line) => parseCard(line))
        .map((c) => { return { count: 1, card: c } })

    cards.forEach((c, index) => {
        for (let count = 1; count <= c.count; count++) {
            const winningNumbers = findWinningNumbers(c.card)

            // increment the count on the next N cards
            for (let i = (index + 1); i <= (index + winningNumbers.length); i++) {
                cards[i].count += 1
            }
        }
    })

    // add and return the total count value
    return cards.map((c) => c.count).reduce((prev: number, curr) => (prev + curr))
}
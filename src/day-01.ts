export const partOne = (input: string): number => {
    const v = input.trim().split('\n')
        .map(e => e.trim()).map((line): number => {
            const digits: string[] = []
            for (let start = 0; start < line.length; start++) {
                const character = line.substring(start, start + 1)
                if (!Number.isNaN(parseInt(character))) {
                    digits.push(character)
                }
            }

            if (digits.length == 0) throw 'no digits'
            return parseInt(digits[0] + digits[digits.length - 1])
        })

    return v.reduce((prev, current) => { return prev + current })
}

export const partTwo = (input: string): number => {
    const v = input.trim().split('\n')
        .map(e => e.trim()).map((line): number => {
            const words: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

            const digits: string[] = []
            for (let start = 0; start < line.length; start++) {
                let peek = line.substring(start)
                for (let idx = 0; idx < words.length; idx++) {
                    const word = words[idx]
                    if (peek.indexOf(word) == 0) {
                        digits.push((idx + 1).toString())
                    }
                }

                peek = line.substring(start, start + 1)
                if (!Number.isNaN(parseInt(peek))) {
                    digits.push(peek)
                }
            }

            if (digits.length == 0) throw 'no digits'
            return parseInt(digits[0] + digits[digits.length - 1])
        })

    return v.reduce((prev, current) => { return prev + current })
}


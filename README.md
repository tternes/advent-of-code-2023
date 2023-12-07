# Advent of Code 2023

My solutions to [Advent of Code 2023](https://adventofcode.com/2023) 🎄

## Dependencies

Use `yarn` to install dependencies: `yarn install`.

As of writing, I'm using node 20 via [nvm](https://github.com/nvm-sh/nvm). If you have nvm installed, simply run `nvm use` and confirm with `node -v`

```
$ nvm use
Found '/Users/thaddeus/src/advent-of-code-2023/.nvmrc' with version <20>
Now using node v20.10.0 (npm v10.2.3)

$ node -v
v20.10.0
```

## Running the code

Each day's source file includes a set of tests (`.test.ts`). These files load data from local definitions or separate files. They'll always demonstrate the correct answer to each day's puzzles, along with some extra tests to validate smaller parts of the solutions.

The `package.json` has a test script configured, so running `yarn test` is adequate to invoke `jest` and have test results displayed.

```
$ yarn test
yarn run v1.22.21
$ jest
 PASS  src/day-03.test.ts
 PASS  src/day-01.test.ts
 PASS  src/day-02.test.ts

Test Suites: 3 passed, 3 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        1.132 s, estimated 2 s
Ran all test suites.
✨  Done in 1.44s.
```
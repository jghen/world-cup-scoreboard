# Football world cup scoreboard

## Description

This project is a World Cup Score Board that allows you to manage football matches, keep track of scores and matches. It runs a simulated wold cup. 

## Installation

1. Clone the repository:

```sh
git clone https://github.com/jghen/world-cup-scoreboard
cd world-cup-score-board
```

2. Install dependencies:
```sh
npm install
```

3. Run WC-simulation:
```sh
npm start
```

4. Run tests:
```sh
npm test
```

## Features

- Start and end matches
- Prevent teams from playing in more than one match at the same time
- Track match scores
- Retrieve summaries of all matches, sorted by total score and most recent first

## Dependencies for testing / development

- [jest](https://jestjs.io/) - testing framework
- [nodemon](https://nodemon.io/) - Auto-detect changes and automatically restart.

## Assumptions

- Each team can participate in only one match at a time.
- Matches can be started and ended.
- The system should be able to provide a summary of matches sorted by total score and most recent first.
- If a draw, the simulation randomly picks a winner and sends to the next round.

## Author

Jan Georg Henriksen
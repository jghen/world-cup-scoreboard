class Team {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

class Match {
  #homeTeam;
  #awayTeam;
  #score;
  #hasStarted;
  #hasEnded;

  constructor(homeTeam, awayTeam) {
    this.#homeTeam = homeTeam;
    this.#awayTeam = awayTeam;
    this.#score = new Score();
    this.#hasStarted = false;
    this.#hasEnded = false;
  }

  startGame() {
    if (!this.#hasStarted) {
      this.#hasStarted = true;
      console.log(`Game started: ${this.#homeTeam.getName()} vs ${this.#awayTeam.getName()}`);
    } else {
      console.error('Game has already started.');
    }
  }

  endGame() {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#hasEnded = true;
      console.log(`Game ended: ${this.#homeTeam.getName()} vs ${this.#awayTeam.getName()}`);
    } else {
      console.error('Game has not started or has already ended.');
    }
  }

  updateScore(homeScore, awayScore) {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#score.update(homeScore, awayScore);
    } else {
      console.error('Cannot update score: Game has not started or has already ended.');
    }
  }

  getScoreAsString() {
    return this.#score.asString();
  }

  getScoreAsObject() {
    return this.#score.asObject();
  }

  getHomeTeam() {
    return this.#homeTeam;
  }

  getAwayTeam() {
    return this.#awayTeam;
  }
}

class Score {
  #score;

  constructor() {
    this.#score = { home: 0, away: 0 };
  }

  asString() {
    return `${this.#score.home} - ${this.#score.away}`;
  }

  asObject() {
    return this.#score;
  }

  update(newHomeScore, newAwayScore) {
    this.#score = { home: newHomeScore, away: newAwayScore };
  }
}

class MatchManager {
  #matches;

  constructor() {
    this.#matches = [];
  }

  startGame(homeTeam, awayTeam) {
    const match = new Match(homeTeam, awayTeam);
    match.startGame();
    this.#matches.push(match);
    return match;
  }

  getMatches() {
    console.info('Current matches:', this.#matches[0].getHomeTeam().getName());
    return this.#matches;
  }

}

module.exports = {
  Team,
  Match,
  Score,
  MatchManager
};

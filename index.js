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
      return true;
    } else {
      console.error("Game has already started.");
      return false;
    }
  }

  endGame() {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#hasEnded = true;
      console.log(`Game ended: ${this.#homeTeam.getName()} vs ${this.#awayTeam.getName()}`);
      return true;
    } else {
      console.error("Game has not started or has already ended.");
      return false;
    }
  }

  updateHomeScore(score) {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#score.updateHome(score);
      return true;
    } else {
      console.error("Cannot update score: Game has not started or has already ended.");
      return false;
    }
  }

  updateAwayScore(score) {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#score.updateAway(score);
      return true;
    } else {
      console.error("Cannot update score: Game has not started or has already ended.");
      return false;
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
  
  hasStarted() {
    return this.#hasStarted;
  }
  
  hasEnded() {
    return this.#hasEnded;
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

  updateHome(homeScore) {
    this.#score.home = homeScore;
  }

  updateAway(awayScore) {
    this.#score.away = awayScore;
  }
}

class MatchManager {
  #matches;

  constructor() {
    this.#matches = [];
  }

  startGame(homeTeam, awayTeam) {
    const match = new Match(homeTeam, awayTeam);
    const hasStarted = match.startGame();
    if (hasStarted) {
      this.#matches.push(match);
      return match;
    }
  }

  endGame(match) {
    const hasEnded = match.endGame();
    if (hasEnded) {
      this.#matches = this.#matches.filter(m => m !== match);
      return match;
    }
  }

  getMatches() {
    return this.#matches;
  }
}

module.exports = {
  Team,
  Match,
  Score,
  MatchManager,
};

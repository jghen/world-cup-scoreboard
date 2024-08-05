const Score = require('./Score');

class Match {
  #homeTeam;
  #awayTeam;
  #score;
  #hasStarted;
  #hasEnded;
  #timeStarted;

  constructor(homeTeam, awayTeam) {
    this.#homeTeam = homeTeam;
    this.#awayTeam = awayTeam;
    this.#score = new Score();
    this.#hasStarted = false;
    this.#hasEnded = false;
    this.#timeStarted = new Date();
    
    this.#homeTeam.setPlaying(true);
    this.#awayTeam.setPlaying(true);
  }

  startGame() {
    if (!this.#hasStarted) {
      this.#hasStarted = true;
      return true;
    } else {
      console.error("Game has already started.");
      return false;
    }
  }

  endGame() {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#hasEnded = true;
      this.#homeTeam.setPlaying(false);
      this.#awayTeam.setPlaying(false);
      return true;
    } else {
      console.error("Game has not started or has already ended.");
      return false;
    }
  }

  updateScore(homeScore, awayScore) {
    if (!this.#hasStarted || this.#hasEnded) {
      throw new Error(
        "Cannot update score: Game has not started or has already ended."
      );
    }
    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Scores cannot be negative");
    }
    this.#score.update(homeScore, awayScore);
  }

  incrementHomeScore() {
    if (!this.#hasStarted || this.#hasEnded) {
      throw new Error(
        "Cannot increment score: Game has not started or has already ended."
      );
    }
    this.#score.incrementHome();
  }

  incrementAwayScore() {
    if (!this.#hasStarted || this.#hasEnded) {
      throw new Error(
        "Cannot increment score: Game has not started or has already ended."
      );
    }
    this.#score.incrementAway();
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

  getWinner() {
    if (!this.#hasEnded) {
      throw new Error("Cannot determine winner: Game has not ended.");
    }

    const { home, away } = this.#score.asObject();
    if (home > away) {
      return this.#homeTeam.getName();
    } else if (away > home) {
      return this.#awayTeam.getName();
    } else {
      return null;
    }
  }

  getTimeStarted() {
    return this.#timeStarted;
  }
  showInfo() {
    return `${this.#homeTeam.getName()} ${this.getScoreAsString()} ${this.#awayTeam.getName()}`;
  }
  
}


module.exports = Match;
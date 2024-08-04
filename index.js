class Team {
  #name;
  #isPlaying;

  constructor(name) {
    this.#name = name;
    this.#isPlaying = false; // Track if the team is currently playing in a match
  }

  getName() {
    return this.#name;
  }

  setPlaying(status) {
    this.#isPlaying = status;
  }

  isPlaying() {
    return this.#isPlaying;
  }
}


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
  }

  startGame() {
    if (!this.#hasStarted) {
      this.#hasStarted = true;
      console.log(
        `Game started: ${this.#homeTeam.getName()} vs ${this.#awayTeam.getName()}`
      );
      return true;
    } else {
      console.error("Game has already started.");
      return false;
    }
  }

  endGame() {
    if (this.#hasStarted && !this.#hasEnded) {
      this.#hasEnded = true;
      console.log(
        `Game ended: ${this.#homeTeam.getName()} vs ${this.#awayTeam.getName()}`
      );
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
      return "Draw";
    }
  }

  getTimeStarted() {
    return this.#timeStarted;
  }
  showInfo() {
    return `${this.#homeTeam.getName()} ${this.getScoreAsString()} ${this.#awayTeam.getName()}`;
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

  update(homeScore, awayScore) {
    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Scores cannot be negative");
    }
    this.#score.home = homeScore;
    this.#score.away = awayScore;
  }

  incrementHome() {
    this.#score.home += 1;
  }

  incrementAway() {
    this.#score.away += 1;
  }
}

class MatchManager {
  #matches;

  constructor() {
    this.#matches = [];
  }

  startGame(homeTeam, awayTeam) {
    if (homeTeam.isPlaying() || awayTeam.isPlaying()) {
      console.error("One or both teams are already in a match.");
      return null;
    }

    const match = new Match(homeTeam, awayTeam);
    const hasStarted = match.startGame();
    if (hasStarted) {
      this.#matches.push(match);
      homeTeam.setPlaying(true);
      awayTeam.setPlaying(true);
      console.log('Match added:', match);
      return match;
    }
    return null;
  }

  endGame(match) {
    const hasEnded = match.endGame();
    if (hasEnded) {
      this.#matches = this.#matches.filter(m => m !== match);
      match.getHomeTeam().setPlaying(false);
      match.getAwayTeam().setPlaying(false);
      console.log('Match removed:', match);
      return match;
    }
    return null;
  }

  getMatches() {
    console.log('Current matches:', this.#matches.map(m => m.showInfo()));
    return this.#matches;
  }


  getSummary() {
    console.log('Matches before sorting:', this.#matches.map(m => m.showInfo()));

    const sortedMatches = [...this.#matches].sort((a, b) => {
      const scoreA = a.getScoreAsObject().home + a.getScoreAsObject().away;
      const scoreB = b.getScoreAsObject().home + b.getScoreAsObject().away;

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      console.log('----sorting time!!! - ---')
      return a.getTimeStarted() - b.getTimeStarted();
    });

    console.log('Sorted matches:', sortedMatches.map(match => match.showInfo()));

    return sortedMatches.map(match => match.showInfo());
  }
}






module.exports = {
  Team,
  Match,
  Score,
  MatchManager,
};

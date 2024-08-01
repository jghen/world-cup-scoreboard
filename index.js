class Team {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Match {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.score = new Score();
    this.hasStarted = false;
    this.hasEnded = false;
  }

  getHomeTeam() {
    return this.homeTeam;
  }

  getAwayTeam() {
    return this.awayTeam;
  }

  getScoreAsString() {
    return this.score.asString();
  }

  getScoreAsObject() {
    return this.score.asObject();
  }

  startGame() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      console.log( `Game started: ${this.homeTeam.getName()} vs ${this.awayTeam.getName()}` );
    } else {
      console.error("Game has already started.");
    }
  }

  endGame() {
    if (this.hasStarted && !this.hasEnded) {
      this.hasEnded = true;
      console.log( `Game ended: ${this.homeTeam.getName()} vs ${this.awayTeam.getName()}` );
    } else {
      console.error("Game has not started or has already ended.");
    }
  }

  updateScore(homeScore, awayScore) {
    if (this.hasStarted && !this.hasEnded) {
      this.score.update(homeScore, awayScore);
      
    } else {
      console.error( "Cannot update score: Game has not started or has already ended." );
    }
  }
}

class Score {
  constructor() {
    this._score = { home: 0, away: 0 };
  }

  asString() {
    return `${this._score.home} - ${this._score.away}`;
  }

  asObject() {
    return this._score;
  }

  update(homeScore, awayScore) {
    this._score = { home: homeScore, away: awayScore };
  }
}

module.exports = {
  Team,
  Match,
  Score,
};

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

  getScoreAsObject ( ) {
    return this.score.asObject();
  }
}

class Score {
  constructor() {
    this._score = { home: 0, away: 0 };
  }


  asString() {
    return `${this._score.home} - ${this._score.away}`
  }

  asObject () {
    return this._score;
  }
}

module.exports = {
  Team,
  Match,
  Score,
};

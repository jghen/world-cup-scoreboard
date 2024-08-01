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
    this.homeScore = 0;
    this.awayScore = 0;
    
  }

  getHomeTeam () {
    return this.homeTeam;
  }

  getAwayTeam () {
    return this.awayTeam;
  }


}

class Score {
  

}


module.exports = {
  Team, Match, Score
}
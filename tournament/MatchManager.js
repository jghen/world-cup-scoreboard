const Match = require("./Match");

class MatchManager {
  #allMatches; 
  #currentMatches; 

  constructor() {
    this.#allMatches = [];
    this.#currentMatches = [];
  }

  startGame(homeTeam, awayTeam) {
    if (homeTeam.isPlaying() || awayTeam.isPlaying()) {
      throw new Error("One or both teams are already in a match.");
    }

    const match = new Match(homeTeam, awayTeam);
    const hasStarted = match.startGame();
    if (hasStarted) {
      this.#allMatches.push(match);
      this.#currentMatches.push(match);
      return match;
    }
    return null;
  }

  endGame(match) {
    const hasEnded = match.endGame();
    if (hasEnded) {
      this.#currentMatches = this.#currentMatches.filter(m => m !== match);
      return match;
    }
    return null;
  }

  getAllMatches() {
    return this.#allMatches;
  }

  getCurrentMatches () {
    return this.#currentMatches;
  }

  getSummary() {
    const sortedMatches = [...this.#allMatches].sort((a, b) => {
      const scoreA = a.getScoreAsObject().home + a.getScoreAsObject().away;
      const scoreB = b.getScoreAsObject().home + b.getScoreAsObject().away;

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return a.getTimeStarted() - b.getTimeStarted();
    });

    return sortedMatches.map((match) => match.showInfo());
  }
}

module.exports = MatchManager;

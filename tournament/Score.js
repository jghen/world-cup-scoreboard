
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
module.exports = Score;
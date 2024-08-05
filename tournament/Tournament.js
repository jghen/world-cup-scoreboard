const MatchManager = require('./MatchManager');


class Tournament {
  #teams;
  #manager;
  #wait;
  #timeout;

  constructor(teams, timeout) {
    if (teams.length < 4) {
      throw new Error("A minimum of 4 teams is required to start a tournament.");
    }

    if (teams.length % 2 !== 0) {
      throw new Error("The number of teams must be even.");
    }
    
    this.#teams = teams;
    this.#manager = new MatchManager();
    this.#wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    this.#timeout = timeout;
  }

  getTeams() {
    return this.#teams;
  }

  async #simulateMatch(team1, team2) {
    const match = this.#manager.startGame(team1, team2);
    if (!match) return null;
    
    console.log(`\nNew match: ${match.getHomeTeam().getName()} VS ${match.getAwayTeam().getName()}`);

    await this.#wait(this.#timeout);

    // Simulate random score increments
    const increments = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < increments; i++) {
      this.#incrementRandomScore(match);
    }
    

    this.#manager.endGame(match);
    await this.#wait(this.#timeout);
    console.log(`Game end: ${match.showInfo()}`);

    const winner = match.getWinner();
    if (!winner) {
      const randomWinner = Math.random() < 0.5 ? team1 : team2;
      console.log(`Draw. Winner by coin-flip: ${randomWinner.getName()}\n`);
      return randomWinner.getName();
    }
    console.log(`Winner: ${winner}\n`);
    return winner;
    
  }

  async #runRound() {
    let roundWinners = [];
    //two and two teams go into a match
    for (let i = 0; i < this.#teams.length; i += 2) {
      const team1 = this.#teams[i];
      const team2 = this.#teams[i + 1];
      const winner = await this.#simulateMatch(team1, team2);
      
      if (winner) {
        roundWinners.push(this.#teams.find(team => team.getName() === winner));
      }
    }
    this.#teams = roundWinners.filter(team => team !== undefined);
  }

  async simulateTournament() {

    while (this.#teams.length > 1) {
      console.log(`\n--- Starting new round with ${this.#teams.length} teams ---`);
      this.getSummary();
      await this.#runRound();

      // console.log('\nSummary of matches:\n' + this.getSummary().join('\n'));
    }

    if (this.#teams.length === 1) {
      console.log(`\nWinner of the tournament: ${this.#teams[0].getName()}\n`);
    } else {
      console.log("\nTournament ended without a clear winner. Extra time...\n");
    }
  }

  #incrementRandomScore(match) {
    if (!match.hasStarted() || match.hasEnded()) {
      throw new Error("Cannot increment score: Game has not started or has already ended.");
    }

    const randomChoice = Math.random() < 0.5 ? "home" : "away";
    if (randomChoice === "home") {
      match.incrementHomeScore();
    } else {
      match.incrementAwayScore();
    }
  }

  getSummary() {
    return this.#manager.getSummary();
  }
}


module.exports = Tournament;

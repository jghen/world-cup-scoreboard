class TeamsService {
  #teams;

  constructor(teams) {
    this.#teams = teams;
  }

  getTwoRandomTeams() {
    if (this.#teams.length < 2) {
      throw new Error("Not enough teams to select two");
    }

    const [team1, team2] = this.#teams
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    return [team1, team2];
  }

  getAllTeams() {
    return this.#teams;
  }
}

module.exports = TeamsService;

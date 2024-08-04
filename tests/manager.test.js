const { MatchManager, Team } = require("../index.js");

describe("MatchManager Class", () => {
  let manager;

  beforeEach(() => {
    manager = new MatchManager();
  });

  test("should not allow a team to be in two matches at once", () => {
    const team1 = new Team("Norway");
    const team2 = new Team("Sweden");
    const team3 = new Team("France");
    const team4 = new Team("Germany");

    // Start the first match
    const match1 = manager.startGame(team1, team2);
    expect(match1).not.toBeNull();
    expect(manager.getMatches().length).toBe(1);
    expect(team1.isPlaying()).toBe(true);
    expect(team2.isPlaying()).toBe(true);

    // Attempt to start a second match with one of the same teams
    const match2 = manager.startGame(team1, team3);
    expect(match2).toBeNull(); // Should be null because team1 is already in a match
    expect(manager.getMatches().length).toBe(1);

    // End the first match
    manager.endGame(match1);
    expect(manager.getMatches().length).toBe(0);
    expect(team1.isPlaying()).toBe(false);
    expect(team2.isPlaying()).toBe(false);

    // Now starting a match with team1 should succeed
    const match3 = manager.startGame(team1, team4);
    expect(match3).not.toBeNull();
    expect(manager.getMatches().length).toBe(1);
    expect(team1.isPlaying()).toBe(true);
    expect(team4.isPlaying()).toBe(true);
  });

  test("should start and end matches", () => {
    const team1 = new Team("Norway");
    const team2 = new Team("Sweden");
    const match = manager.startGame(team1, team2);

    expect(match.getHomeTeam().getName()).toBe("Norway");
    expect(match.getAwayTeam().getName()).toBe("Sweden");
    expect(match.getScoreAsString()).toBe("0 - 0");
    expect(manager.getMatches().length).toBe(1);

    manager.endGame(match);

    expect(manager.getMatches().length).toBe(0);
    expect(match.hasEnded()).toBe(true);
  });

  test("should manage multiple matches", () => {
    console.log("-------------------");
    const team1 = new Team("France");
    const team2 = new Team("Germany");
    const match1 = manager.startGame(team1, team2);
    expect(manager.getMatches().length).toBe(1);

    const team3 = new Team("Spain");
    const team4 = new Team("Italy");
    const match2 = manager.startGame(team3, team4);
    expect(manager.getMatches().length).toBe(2);

    manager.endGame(match1);
    expect(manager.getMatches().length).toBe(1);
  });

  test("should return matches sorted by total score and most recent first", () => {
    const team1 = new Team("Brazil");
    const team2 = new Team("Argentina");
    const team3 = new Team("Spain");
    const team4 = new Team("Germany");

    const match1 = manager.startGame(team1, team2);
    match1.updateScore(1, 0);

    const match2 = manager.startGame(team3, team4);
    match2.updateScore(2, 2);

    const summary = manager.getSummary();

    console.log("Summary:", summary); // For debugging

    expect(summary).toEqual(["Spain 2 - 2 Germany", "Brazil 1 - 0 Argentina"]);
  });

  test("should handle no matches", () => {
    const summary = manager.getSummary();
    expect(summary).toEqual([]);
  });

  test("should handle matches with the same score", () => {
    const team1 = new Team("Brazil");
    const team2 = new Team("Argentina");
    const team3 = new Team("Spain");
    const team4 = new Team("Germany");

    const match1 = manager.startGame(team1, team2);
    match1.updateScore(2, 2);

    const match2 = manager.startGame(team3, team4);
    match2.updateScore(2, 2);

    const summary = manager.getSummary();

    console.log("Summary:", summary); // For debugging

    expect(summary).toEqual(["Brazil 2 - 2 Argentina", "Spain 2 - 2 Germany"]);
  });
});

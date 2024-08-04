const { MatchManager, Team } = require('../index.js');

describe('MatchManager Class', () => {
  let manager;

  beforeEach(() => {
    manager = new MatchManager();
  });

  test('should start and end matches', () => {
    const team1 = new Team('Norway');
    const team2 = new Team('Sweden');
    const match = manager.startGame(team1, team2);

    expect(match.getHomeTeam().getName()).toBe('Norway');
    expect(match.getAwayTeam().getName()).toBe('Sweden');
    expect(match.getScoreAsString()).toBe('0 - 0');
    expect(manager.getMatches().length).toBe(1);

    manager.endGame(match);

    expect(manager.getMatches().length).toBe(0);
    expect(match.hasEnded()).toBe(true);
  });

  test('should manage multiple matches', () => {
    const team1 = new Team('France');
    const team2 = new Team('Germany');
    const match1 = manager.startGame(team1, team2);
    expect(manager.getMatches().length).toBe(1);

    const team3 = new Team('Spain');
    const team4 = new Team('Italy');
    const match2 = manager.startGame(team3, team4);
    expect(manager.getMatches().length).toBe(2);

    manager.endGame(match1);
    expect(manager.getMatches().length).toBe(1);
  });
});

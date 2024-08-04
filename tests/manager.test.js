// tests/matchManager.test.js
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
});

const { Match, Team } = require('../index');

describe('Match Class', () => {
  let match;

  beforeEach(() => {
    const team1 = new Team('Brazil');
    const team2 = new Team('Argentina');
    match = new Match(team1, team2);
  });

  test('should create a match with two teams', () => {
    expect(match.getHomeTeam().getName()).toBe('Brazil');
    expect(match.getAwayTeam().getName()).toBe('Argentina');
  });

  test('should start and end a match', () => {
    match.startGame();
    expect(match.getScoreAsString()).toBe('0 - 0');

    match.updateScore(1, 2);
    expect(match.getScoreAsString()).toBe('1 - 2');

    match.endGame();
    expect(match.getScoreAsString()).toBe('1 - 2');
  });
});
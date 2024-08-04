const { incrementRandomScore } = require('../utils.js');
const { Match, Team } = require('../index.js');

describe('Utility Functions', () => {
  let match;

  beforeEach(() => {
    const team1 = new Team('Brazil');
    const team2 = new Team('Argentina');
    match = new Match(team1, team2);
  });

  test('should randomly increment home or away score', () => {
    match.startGame();
    
    // Track the number of increments
    const homeScoreBefore = match.getScoreAsObject().home;
    const awayScoreBefore = match.getScoreAsObject().away;

    // Increment random score multiple times
    for (let i = 0; i < 100; i++) {
      incrementRandomScore(match);
    }

    const homeScoreAfter = match.getScoreAsObject().home;
    const awayScoreAfter = match.getScoreAsObject().away;

    // Check if the score has increased
    expect(homeScoreAfter).toBeGreaterThan(homeScoreBefore);
    expect(awayScoreAfter).toBeGreaterThan(awayScoreBefore);
  });

  test('should throw an error if the match has not started', () => {
    expect(() => incrementRandomScore(match)).toThrow();
  });

  test('should throw an error if the match has ended', () => {
    match.startGame();
    match.endGame();
    expect(() => incrementRandomScore(match)).toThrow();
  });
});

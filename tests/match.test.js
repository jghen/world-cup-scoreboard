const Team = require('../tournament/Team');
const Match = require('../tournament/Match');

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
    expect(match.getScoreAsObject()).toEqual({ home: 1, away: 2 });
  });

  test('should increment home score by 1', () => {
    match.startGame();
    match.incrementHomeScore();
    expect(match.getScoreAsString()).toBe('1 - 0');
  });

  test('should increment away score by 1', () => {
    match.startGame();
    match.incrementAwayScore();
    expect(match.getScoreAsString()).toBe('0 - 1');
  });

  test('should handle updating scores directly and incrementing', () => {
    match.startGame();
    match.updateScore(2, 3);
    expect(match.getScoreAsString()).toBe('2 - 3');
    
    match.incrementHomeScore();
    expect(match.getScoreAsString()).toBe('3 - 3');
    
    match.incrementAwayScore();
    expect(match.getScoreAsString()).toBe('3 - 4');
  });

  test('should not allow score updates if the game has not started', () => {
    expect(() => match.updateScore(4, 5)).toThrow(Error);
  });

  test('should not allow score updates if the game has ended', () => {
    match.startGame();
    match.endGame();
    expect(() => match.updateScore(4, 5)).toThrow(Error);
  });

  test('should throw an error if negative scores are provided', () => {
    match.startGame();
    expect(() => match.updateScore(-1, 0)).toThrow(Error);
    expect(() => match.updateScore(0, -1)).toThrow(Error);
  });

  test('should throw an error if getWinner is called before the match has ended', () => {
    match.startGame();
    expect(() => match.getWinner()).toThrow(Error);
  });

  test('should return the home team as winner if home score is higher', () => {
    match.startGame();
    match.updateScore(3, 2);
    match.endGame();
    expect(match.getWinner()).toBe('Brazil');
  });

  test('should return the away team as winner if away score is higher', () => {
    match.startGame();
    match.updateScore(2, 3);
    match.endGame();
    expect(match.getWinner()).toBe('Argentina');
  });

  test('should return "Draw" if scores are equal', () => {
    match.startGame();
    match.updateScore(2, 2);
    match.endGame();
    expect(match.getWinner()).toBeNull();
  });
});

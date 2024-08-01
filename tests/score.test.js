const Score = require('../index.js').Score;

describe('Score Class', () => {
  test('should initialize with 0-0 score', () => {
    const score = new Score();
    expect(score.asObject()).toEqual({ home: 0, away: 0 });
  });

});
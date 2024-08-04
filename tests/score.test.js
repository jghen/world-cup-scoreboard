const {Score} = require('../index.js');

describe('Score Class', () => {
  test('should initialize with 0-0 score', () => {
    const score = new Score();
    expect(score.asObject()).toEqual({ home: 0, away: 0 });
  });

  test('should update the score correctly', () => {
    const score = new Score();
    score.update(2, 3);
    expect(score.asString()).toBe('2 - 3');
    expect(score.asObject()).toEqual({ home: 2, away: 3 });
  });
});
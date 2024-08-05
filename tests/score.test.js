const Score = require("../tournament/Score");

describe("Score Class", () => {
  test("should initialize with 0-0 score", () => {
    const score = new Score();
    expect(score.asObject()).toEqual({ home: 0, away: 0 });
  });

  test("should update the score correctly", () => {
    const score = new Score();
    score.update(2, 3);
    expect(score.asString()).toBe("2 - 3");
    expect(score.asObject()).toEqual({ home: 2, away: 3 });
  });

  test("should increment home score by 1", () => {
    const score = new Score();
    score.incrementHome();
    expect(score.asString()).toBe("1 - 0");
    expect(score.asObject()).toEqual({ home: 1, away: 0 });
  });

  test("should increment away score by 1", () => {
    const score = new Score();
    score.incrementAway();
    expect(score.asString()).toBe("0 - 1");
    expect(score.asObject()).toEqual({ home: 0, away: 1 });
  });
});

const { teams } = require("../teams");

describe('teams module test', () => {
  test('should contain correct teams', () => {
    const expectedTeams = [
      "Norway",
      "Sweden",
      "Brazil",
      "Uruguay",
      "Mexico",
      "France",
      "Italy",
      "South Korea",
    ];

    expect(teams).toEqual(expectedTeams);
  });

  test('should have no duplicate teams', () => {
    const uniqueTeams = new Set(teams);
    expect(uniqueTeams.size).toBe(teams.length);
  });

  test('should have more than one team', () => {
    expect(teams.length).toBeGreaterThan(1);
  });
});

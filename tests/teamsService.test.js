const TeamsService = require('../teamsService.js');

describe('TeamsService test', () => {
  const teams = [
    "Norway", "Sweden", "Brazil", "Uruguay", "Mexico", "France", "Italy", "South Korea"
  ];

  let teamsService;

  beforeEach(() => {
    teamsService = new TeamsService(teams);
  });

  test('should return all teams', () => {
    expect(teamsService.getAllTeams()).toEqual(teams);
  });

  test('should throw an error if there are not enough teams', () => {
    const fewTeamsService = new TeamsService(["Norway"]);
    expect(() => fewTeamsService.getTwoRandomTeams()).toThrow("Not enough teams to select two");
  });

  test('should return two distinct random teams', () => {
    const [team1, team2] = teamsService.getTwoRandomTeams();
    expect(team1).not.toBe(team2);
    expect(teams).toContain(team1);
    expect(teams).toContain(team2);
  });

});

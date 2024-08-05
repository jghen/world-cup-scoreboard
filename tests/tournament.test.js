const Team = require('../tournament/Team');
const Match = require('../tournament/Match');
const Tournament = require('../tournament/Tournament');

describe('Tournament Class', () => {
  let teamA, teamB, teamC, teamD, tournament;

  beforeEach(() => {
    // Create some test teams
    teamA = new Team('Team A');
    teamB = new Team('Team B');
    teamC = new Team('Team C');
    teamD = new Team('Team D');

    // Initialize a tournament with 4 teams
    tournament = new Tournament([teamA, teamB, teamC, teamD], 100);
  });

  test('should initialize with valid number of teams', () => {
    expect(tournament.getTeams().length).toBe(4);
  });

  test('should throw an error if fewer than 4 teams are provided', () => {
    expect(() => new Tournament([teamA, teamB, teamC], 100)).toThrow(Error);
  });

  test('should simulate a match and determine winners', async () => {
    // Run the tournament simulation
    await tournament.simulateTournament();

    // Check that a winner is declared
    const remainingTeams = tournament.getTeams();
    if (remainingTeams.length === 1) {
      expect(remainingTeams[0]).toBeInstanceOf(Team);
    } else {
      expect(remainingTeams.length).toBe(0); // If no winner, teams should be 0 (extra time scenario)
    }
  });

  test('should return summary of matches after simulation', async () => {
    await tournament.simulateTournament(); // Run the full tournament to get matches

    const summary = tournament.getSummary(); 
    expect(summary.length).toBeGreaterThan(0);
    summary.forEach(info => expect(typeof info).toBe('string'));
  });

  test('should handle a tournament with 1 team left correctly', async () => {
    // Simulate a full tournament
    await tournament.simulateTournament();

    const remainingTeams = tournament.getTeams();
    expect(remainingTeams.length).toBeLessThanOrEqual(1);
    if (remainingTeams.length === 1) {
      expect(remainingTeams[0]).toBeInstanceOf(Team);
    }
  });

  test('should handle incrementing scores', () => {
    const match = new Match(teamA, teamB);
    match.startGame();
    
    // Increment scores directly
    match.incrementHomeScore();
    match.incrementAwayScore();

    const scores = match.getScoreAsObject();
    expect(scores.home).toBe(1);
    expect(scores.away).toBe(1);
  });
});

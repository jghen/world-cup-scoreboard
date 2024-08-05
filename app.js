const Tournament = require('./tournament/Tournament');
const Team  = require('./tournament/Team');
const { teams } = require("./teams");
const TeamsService = require("./teamsService");
const teamsService = new TeamsService(teams);


const teamNames = teamsService.getAllTeams();
const teamObjects = teamNames.map(name => new Team(name));

try {
  const tournament = new Tournament(teamObjects, 1000);
  tournament.simulateTournament().catch(console.error);
} catch (error) {
  console.error(error.message);
}
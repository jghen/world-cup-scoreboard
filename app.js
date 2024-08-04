const { MatchManager, Team } = require("./index");
const { timeout } = require("./utils");
const {teams} = require("./teams");
const TeamsService = require('./teamsService');
const teamsService = new TeamsService(teams);

async function simulateGames() {
  
  
  const manager = new MatchManager();
  const team1 = new Team(teamsService.getRandomTeam());
  const team2 = new Team(teamsService.getRandomTeam());

  await timeout(1000);

  const match = manager.startGame(team1, team2);

  await timeout(2000);
  console.log( "\nOngoing matches:", manager
      .getMatches()
      .map((m) => m.getHomeTeam().getName() + " - " + m.getAwayTeam().getName())
  );

  await timeout(2000);
  console.log("\nScore is: ", match.getScoreAsString());

  await timeout(2000);
  match.updateScore(1, 0);
  console.log("\nScore after update: ", match.getScoreAsString());

  await timeout(2000);
  console.log(`\nHalf time: ${match.getScoreAsString()}\n`);

  await timeout(2000);
  match.endGame();

  await timeout(2000);
  const scoreAsObj = match.getScoreAsObject();
  console.log( `\n--Game end-- \n${team1.getName()}: ${ scoreAsObj.home }\n${team2.getName()}: ${scoreAsObj.away} \n-------------\n` );

  await timeout(1000);

  console.log('Thank you for watching!')
}

simulateGames().catch(console.error);

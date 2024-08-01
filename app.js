const { MatchManager, Team } = require("./index");
const { timeout } = require("./utils");

async function simulateGame() {
  const manager = new MatchManager();
  const team1 = new Team("Norway");
  const team2 = new Team("Sweden");

  await timeout(1000);
  
  const match = manager.startGame(team1, team2);
  const homeTeam = match.getHomeTeam();
  const awayTeam = match.getAwayTeam();
  
  await timeout(2000);
  console.log("\nScore is: ", match.getScoreAsString());

  await timeout(2000);
  match.updateScore(1, 0);
  console.log("\nScore after update: ", match.getScoreAsString());
  
  await timeout(2000);
  let scoreAsObj = match.getScoreAsObject();
  console.log(`\n--Half time-- \n${homeTeam.getName()}: ${scoreAsObj.home}\n${awayTeam.getName()}: ${scoreAsObj.away} \n-------------`);
  
  await timeout(2000);
  match.endGame();
  
  await timeout(2000)
  console.log("\Final score: ", match.getScoreAsString());
  
  await timeout(2000);
}

simulateGame().catch(console.error);

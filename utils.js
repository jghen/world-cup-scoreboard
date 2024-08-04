module.exports = {
  timeout: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  incrementRandomScore: (match) => {
    if (!match.hasStarted() || match.hasEnded()) {
      throw new Error( "Cannot increment score: Game has not started or has already ended." );
    }

    const randomChoice = Math.random() < 0.5 ? "home" : "away";
    if (randomChoice === "home") {
      match.incrementHomeScore();
    } else {
      match.incrementAwayScore();
    }
  },
};

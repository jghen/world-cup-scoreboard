class Team {
  #name;
  #isPlaying;

  constructor(name) {
    this.#name = name;
    this.#isPlaying = false; // Track if the team is currently playing in a match
  }

  getName() {
    return this.#name;
  }

  setPlaying(status) {
    this.#isPlaying = status;
  }

  isPlaying() {
    return this.#isPlaying;
  }
}

module.exports = Team;
const {Team} = require("../index.js");

describe("Team Class", () => {
  test("should create a team with a given name", () => {
    const team = new Team("Brazil");
    console.log(team + team.getName() + typeof team.getName());
    expect(team.getName()).toBe("Brazil");
  });
});

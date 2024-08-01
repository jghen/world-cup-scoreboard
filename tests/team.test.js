const {Team} = require("../index.js");

describe("Team Class", () => {
  let team;

  beforeEach(() => {
    team = new Team("Brazil");
  });

  test("should create a team with a given name", () => {
    
    expect(team.getName()).toBe("Brazil");
  });

  test("test private class", ()=> {
    expect(team['#name']).toBeUndefined();
  })
});

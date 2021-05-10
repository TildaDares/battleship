const Player = require("../player.js");
let player1 = Player(true);
let player2 = Player(false);

// test("returns true if player can attack opponent", () => {
//   expect(player1.attack(player2)).toBe(true);
// });

test("returns false if player shoots the same coordinate twice", () => {
  player2.attack(player1, [2, 4]);
  expect(player2.attack(player1, [2, 4])).toBe(false);
});

const Ship = require("../ship.js");

const ship = Ship(3);

test("returns true if ship has been sunk", () => {
  ship.hit([0, 5]);
  ship.hit([2, 3]);
  ship.hit([0, 2]);
  expect(ship.isSunk()).toBe(true);
});

test("returns false if ship has not been sunk", () => {
  ship.hit([0, 5]);
  ship.hit([2, 3]);
  expect(ship.isSunk()).toBe(false);
});

test("returns length of the ship", () => {
  expect(ship.length).toBe(3);
});

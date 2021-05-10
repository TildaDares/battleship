const GameBoard = require("../gameBoard.js");

describe("placeShip", () => {
  const board = GameBoard();

  test("places ship in a specific coordinates vertically", () => {
    expect(board.placeShip([7, 3], 3, "vertical")).toBe(true);
  });

  test("places ship in a specific coordinates horizontally", () => {
    expect(board.placeShip([5, 2], 5, "horizontal")).toBe(true);
  });

  test("ship should not be placed if the ship goes out of bounds vertically", () => {
    expect(board.placeShip([6, 7], 4, "vertical")).toBe(false);
  });

  test("ship should not be placed if the ship goes out of bounds horizontally", () => {
    expect(board.placeShip([9, 3], 2, "horizontal")).toBe(false);
  });

  test("ship does not overlap horizontally", () => {
    board.placeShip([2, 3], 5, "horizontal");
    expect(board.placeShip([2, 5], 4, "horizontal")).toBe(false);
  });

  test("ship does not overlap vertically", () => {
    board.placeShip([1, 8], 3, "vertical");
    expect(board.placeShip([2, 8], 1, "vertical")).toBe(false);
  });
});

describe("receiveAttack", () => {
  const board = GameBoard();

  board.placeShip([7, 3], 3, "vertical");
  board.placeShip([2, 3], 5, "horizontal");
  board.placeShip([1, 8], 3, "vertical");

  test("returns true if ship has been hit", () => {
    expect(board.receiveAttack([2, 4])).toBe(true);
  });

  test("returns false if ship has not been hit", () => {
    expect(board.receiveAttack([5, 2])).toBe(false);
  });
});

describe("allShipsSunk", () => {
  const board = GameBoard();

  board.placeShip([2, 3], 2, "horizontal");
  board.placeShip([1, 8], 3, "vertical");
  board.receiveAttack([2, 4]);

  test("return false if all ships have not been sunk", () => {
    expect(board.allShipsSunk()).toBe(false);
  });

  test("return true if all ships have been sunk", () => {
    board.receiveAttack([2, 3]);
    board.receiveAttack([1, 8]);
    board.receiveAttack([2, 8]);
    board.receiveAttack([3, 8]);
    expect(board.allShipsSunk()).toBe(true);
  });
});

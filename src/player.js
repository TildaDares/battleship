const GameBoard = require("./gameBoard.js");
const Player = (isComp) => {
  let board = GameBoard();
  board.placeShipsRandomly();
  const attack = (opponent, coords) => {
    if (isComp) {
      return opponent.board.receiveAttack(coords);
    } else {
      return humanAttack(opponent, coords);
    }
  };

  const humanAttack = (opponent, coords) => {
    if (opponent.board.shotCoords.has(coords.join(""))) {
      return false;
    }
    return opponent.board.receiveAttack(coords);
  };

  return { attack, board };
};

module.exports = Player;

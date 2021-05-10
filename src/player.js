const GameBoard = require("./gameBoard.js");
const Player = (isComp) => {
  let board = GameBoard();
  board.placeShipsRandomly();
  const attack = (opponent, coords) => {
    if (isComp) {
      return compAttack(opponent);
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

  const compAttack = (opponent) => {
    return opponent.board.receiveAttack(genRandForComp(opponent));
  };

  const genRandForComp = (opponent) => {
    let randCoord;
    do {
      randCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (opponent.board.shotCoords.has(randCoord.join("")));
    return randCoord;
  };

  return { attack, board };
};

module.exports = Player;

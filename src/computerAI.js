import Player from "./player";

const ComputerAI = () => {
  const comp = Player(true);
  const possibleTargets = [];
  let board = comp.board;

  const addPossibleTargets = (coord, opponent) => {
    const row = [-1, 0, +1, 0];
    const col = [0, +1, 0, -1];

    for (let i = 0; i < 4; i++) {
      let target = [coord[0] + row[i], coord[1] + col[i]];
      if (
        coord[0] + row[i] >= 0 &&
        coord[0] + row[i] < 10 &&
        coord[1] + col[i] >= 0 &&
        coord[1] + col[i] < 10 &&
        !opponent.board.shotCoords.has(target.join(""))
      ) {
        possibleTargets.unshift(target);
      }
    }
    console.log(possibleTargets);
  };

  const getRandForComp = (opponent) => {
    let randCoord;
    do {
      randCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (opponent.board.shotCoords.has(randCoord.join("")));

    return randCoord;
  };

  const aiAttack = (opponent) => {
    const coord =
      possibleTargets.length > 0
        ? possibleTargets.pop()
        : getRandForComp(opponent);
    const isHit = comp.attack(opponent, coord);
    if (isHit) {
      addPossibleTargets(coord, opponent);
    }

    return isHit;
  };

  return { aiAttack, board };
};

export default ComputerAI;

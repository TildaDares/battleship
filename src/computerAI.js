import Player from "./player";

const ComputerAI = () => {
  const comp = Player(true);
  let possibleTargets = [];
  const shipMargins = [];
  let hits = [];
  let orientation = "none";
  let board = comp.board;

  const inRange = (coord) => {
    return coord[0] >= 0 && coord[0] < 10 && coord[1] >= 0 && coord[1] < 10;
  };

  const addPossibleTargets = (coord, opponent) => {
    let row = [-1, +1];
    let col = [0, 0];

    if (orientation === "none") {
      row = [-1, 0, +1, 0];
      col = [0, +1, 0, -1];
    }

    if (orientation === "horizontal") {
      let temp = row;
      row = col;
      col = temp;
    }

    for (let i = 0; i < row.length; i++) {
      let target = [coord[0] + row[i], coord[1] + col[i]];
      if (inRange(target) && !opponent.board.shotCoords.has(target.join(""))) {
        possibleTargets.unshift(target);
      }
    }
  };

  const getRandForComp = (opponent) => {
    let randCoord;
    do {
      randCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (
      opponent.board.shotCoords.has(randCoord.join("")) ||
      shipMargins.includes(randCoord.join(""))
    );

    return randCoord;
  };

  const addMarginToAdjacentCoords = (coord) => {
    const row = [-1, +1, -1, +1];
    const col = [-1, +1, +1, -1];

    for (let i = 0; i < 4; i++) {
      let array = [coord[0] + row[i], coord[1] + col[i]];
      if (inRange(array)) {
        shipMargins.push(array.join(""));
      }
    }
  };

  const addMargin = (ship) => {
    ship.coords.forEach((coord) => {
      addMarginToAdjacentCoords(coord);
    });

    addMarginToOuterCoords(ship.top, ship.bottom, ship.orientation);
  };

  //Marks the array coords directly in front of leftmost and rightmost arrays
  const addMarginToOuterCoords = (top, down, orientation) => {
    if (orientation === "vertical") {
      if (top[0] - 1 >= 0) {
        shipMargins.push([top[0] - 1, top[1]].join(""));
      }
      if (down[0] + 1 < 10) {
        shipMargins.push([down[0] + 1, down[1]].join(""));
      }
    } else {
      if (top[1] - 1 >= 0) {
        shipMargins.push([top[0], top[1] - 1].join(""));
      }
      if (down[1] + 1 < 10) {
        shipMargins.push([down[0], down[1] + 1].join(""));
      }
    }
  };

  const enemyShipSunk = (ship) => {
    addMargin(ship);
    possibleTargets = [];
    hits = [];
    orientation = "none";
  };

  //compares the last two hits shot by the computer to determine the orientation of the ship
  const getShipOrientation = () => {
    for (let i = 0; i < 2; i++) {
      if (hits[hits.length - 1][i] === hits[hits.length - 2][i]) {
        possibleTargets = possibleTargets.filter(
          (target) => target[i] === hits[hits.length - 1][i]
        );

        return i;
      }
    }
  };

  const aiAttack = (opponent) => {
    const coord =
      possibleTargets.length > 0
        ? possibleTargets.pop()
        : getRandForComp(opponent);
    const isHit = comp.attack(opponent, coord);
    if (isHit) {
      hits.push(coord);
      if (orientation === "none" && hits.length > 1) {
        orientation = getShipOrientation() === 0 ? "horizontal" : "vertical";
      }
      addPossibleTargets(coord, opponent);
    }

    return isHit;
  };

  return { aiAttack, board, enemyShipSunk };
};

export default ComputerAI;

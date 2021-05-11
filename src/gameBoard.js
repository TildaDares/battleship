const Ship = require("./ship.js");

const GameBoard = () => {
  let boardArray = [...Array(10)].map(() => Array(10).fill(0));
  let missedShots = [];
  let shotCoords = new Set();
  let ships = {};

  const placeShip = (firstCoord, length, orientation) => {
    if (boardArray[firstCoord[0]][firstCoord[1]] !== 0) {
      return false;
    }
    let directions = [firstCoord];

    if (orientation === "vertical") {
      for (let i = 1; i < length; i++) {
        if (
          firstCoord[0] + i > 9 ||
          boardArray[firstCoord[0] + i][firstCoord[1]] !== 0
        ) {
          return false;
        }
        directions.push([firstCoord[0] + i, firstCoord[1]]);
      }
    } else if (orientation === "horizontal") {
      for (let i = 1; i < length; i++) {
        if (
          firstCoord[1] + i > 9 ||
          boardArray[firstCoord[0]][firstCoord[1] + i] !== 0
        ) {
          return false;
        }
        directions.push([firstCoord[0], firstCoord[1] + i]);
      }
    } else {
      return false;
    }

    createShip(directions, length);
    addMargin(directions, orientation);
    return true;
  };

  const receiveAttack = (coords) => {
    shotCoords.add(coords.join(""));
    for (const name in ships) {
      let coordsToString = JSON.stringify(coords);
      let includesCoord = ships[name].coords.some(
        (item) => JSON.stringify(item) === coordsToString
      );

      if (includesCoord) {
        ships[name].object.hit(coords);
        return true;
      }
    }

    missedShots.push(coords.join(""));
    return false;
  };

  const allShipsSunk = () => {
    for (const name in ships) {
      if (!ships[name].object.isSunk()) {
        return false;
      }
    }
    return true;
  };

  const placeShipsRandomly = () => {
    [5, 4, 3, 3, 2].forEach((num) => {
      let randCoord;
      let orientation;
      let canPlaceShip;

      do {
        randCoord = getRandCoord(num);
        orientation = shipOrientation(randCoord, num);
        canPlaceShip = placeShip(randCoord, num, orientation);
      } while (!canPlaceShip);
    });
  };

  const createShip = (coord, length) => {
    let newShip = "ship" + (Object.keys(ships).length + 1);
    ships[newShip] = {
      object: Ship(length),
      coords: coord,
    };
  };

  const shipOrientation = (coord, length) => {
    let orientations = [];

    if (coord[0] + (length - 1) < 10) {
      orientations.push("vertical");
    }
    if (coord[1] + (length - 1) < 10) {
      orientations.push("horizontal");
    }
    if (orientations.length === 0) {
      return "none";
    }
    return orientations[Math.floor(Math.random() * orientations.length)];
  };

  const addMarginToAdjacentCoords = (array) => {
    const row = [-1, +1, -1, +1];
    const col = [-1, +1, +1, -1];

    for (let i = 0; i < 4; i++) {
      if (
        between(array[0] + row[i], 0, 10) &&
        between(array[1] + col[i], 0, 10)
      ) {
        boardArray[array[0] + row[i]][array[1] + col[i]] = 2;
      }
    }
  };

  //Useful for ships that have a length of 1 only
  /** const addMarginToEmptySides = (array, orientation) => {
    const adj = [+1, -1];

    if (orientation === "horizontal") {
      for (let i = 0; i < 2; i++) {
        if (between(array[0] + adj[i], 0, 10)) {
          boardArray[array[0] + adj[i]][array[1]] = 2;
        }
      }
    } else {
      for (let i = 0; i < 2; i++) {
        if (between(array[1] + adj[i], 0, 10)) {
          boardArray[array[0]][array[1] + adj[i]] = 2;
        }
      }
    }
  }; */

  const addMargin = (shipCoords, orientation) => {
    shipCoords.forEach((array) => {
      boardArray[array[0]][array[1]] = 1;
      addMarginToAdjacentCoords(array);
    });

    addMarginToOuterCoords(
      shipCoords[0],
      shipCoords[shipCoords.length - 1],
      orientation
    );
  };

  //Marks the array coords directly in front of leftmost and rightmost arrays
  const addMarginToOuterCoords = (top, down, orientation) => {
    if (orientation === "vertical") {
      if (top[0] - 1 >= 0) {
        boardArray[top[0] - 1][top[1]] = 2;
      }
      if (down[0] + 1 < 10) {
        boardArray[down[0] + 1][down[1]] = 2;
      }
    } else {
      if (top[1] - 1 >= 0) {
        boardArray[top[0]][top[1] - 1] = 2;
      }
      if (down[1] + 1 < 10) {
        boardArray[down[0]][down[1] + 1] = 2;
      }
    }
  };

  const getRandCoord = (length) => {
    let randCoord;

    do {
      randCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (
      randCoord + (length - 1) > 9 ||
      boardArray[randCoord[0]][randCoord[1]] !== 0
    );

    return randCoord;
  };

  const between = (num, start, end) => num < end && num >= start;

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    placeShipsRandomly,
    shotCoords,
    ships,
  };
};

module.exports = GameBoard;

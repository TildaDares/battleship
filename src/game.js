import Player from "./player";
import ComputerAI from "./computerAI";

const game = (() => {
  let human = Player(false);
  let comp = ComputerAI();
  let compLastMove;
  let humanLastMove;

  const init = () => {
    generateHumanGrid();
    generateCompGrid();
    const turn = document.querySelector(".turn");
    setTimeout(() => {
      turn.style.display = "none";
    }, 3000);
  };

  const shipCoords = (player) => {
    const ships = player.board.ships;
    const shipCoords = [];
    for (const name in ships) {
      ships[name].coords.forEach((coord) => {
        shipCoords.push(coord.join(""));
      });
    }

    return shipCoords;
  };

  const getAttackedShip = (player, coord) => {
    const ships = player.board.ships;
    for (const name in ships) {
      let coordsToString = JSON.stringify(coord);
      let includesCoord = ships[name].coords.some(
        (item) => JSON.stringify(item) === coordsToString
      );

      if (includesCoord) {
        return ships[name];
      }
    }
  };

  const placeShipsOnGrid = (allShipCoords, coord) => {
    if (allShipCoords.includes(coord)) {
      return "ship";
    }
    return "";
  };

  const disableGrid = (elem) => {
    elem.removeEventListener("click", onHumanTurn);
    elem.classList.add("disabled");
  };

  const getOuterGridElem = (ship) => {
    const top = ship.top.join("");
    const bottom = ship.bottom.join("");
    let elemTop;
    let elemBottom;
    if (ship.orientation === "vertical") {
      let topCoord = Number(top[0]) - 1;
      let bottomCoord = Number(bottom[0]) + 1;
      elemTop = document.querySelector("#comp" + topCoord + top[1]);
      elemBottom = document.querySelector("#comp" + bottomCoord + bottom[1]);
    } else {
      let topCoord = Number(top[1]) - 1;
      let bottomCoord = Number(bottom[1]) + 1;
      elemTop = document.querySelector("#comp" + top[0] + topCoord);
      elemBottom = document.querySelector("#comp" + bottom[0] + bottomCoord);
    }
    return { elemTop, elemBottom };
  };

  const markOuterSquares = (player, squareCoord) => {
    const ship = getAttackedShip(player, squareCoord);
    if (ship.object.isSunk()) {
      const { elemTop, elemBottom } = getOuterGridElem(ship);
      if (elemTop) {
        disableGrid(elemTop);
      }
      if (elemBottom) {
        disableGrid(elemBottom);
      }
    }
  };

  const markAdjacentSquares = (squareId) => {
    const coord = [Number(squareId[0]), Number(squareId[1])];
    const row = [-1, +1, -1, +1];
    const col = [-1, +1, +1, -1];

    for (let i = 0; i < 4; i++) {
      let xCoord = coord[0] + row[i];
      let yCoord = coord[1] + col[i];
      const elem = document.querySelector("#comp" + xCoord + yCoord);
      if (elem) {
        disableGrid(elem);
      }
    }
  };

  const restart = (event) => {
    human = Player(false);
    comp = ComputerAI();
    let resultsPar = document.querySelector(".results");
    resultsPar.textContent = "Your grid";
    document.querySelector("#comp-container").style.display = "block";
    document.querySelector(".btn-container").style.display = "none";
    document.querySelector(".turn").style.display = "block";
    document.querySelector(".human-grid").innerHTML = "";
    document.querySelector(".comp-grid").innerHTML = "";
    init();
    event.target.removeEventListener("click", restart);
  };

  const isWinner = (isComp, opponent) => {
    if (opponent.board.allShipsSunk()) {
      let resultsPar = document.querySelector(".results");
      const name = isComp ? "Computer " : "You ";
      resultsPar.textContent = name + "win" + (isComp ? "s" : "") + "! 🎉";
      document.querySelector("#comp-container").style.display = "none";
      document.querySelector(".btn-container").style.display = "flex";
      document.querySelector(".restart-btn").addEventListener("click", restart);
      return true;
    }
    return false;
  };

  const compAttack = () => {
    const isHit = comp.aiAttack(human);
    const shotCoord = [...human.board.shotCoords].slice(-1);
    const grid = document.querySelector("#hum" + shotCoord);
    if (isHit) {
      grid.classList.add("hit");
      if (!isWinner(true, human)) {
        onHumanShipSink([Number(shotCoord[0][0]), Number(shotCoord[0][1])]);
      }
    } else {
      grid.classList.add("miss");
    }

    if (compLastMove) {
      compLastMove.classList.remove("active");
    }
    grid.classList.add("active");
    compLastMove = grid;
    return isHit;
  };

  const onCompsTurn = () => {
    let isHit;
    do {
      isHit = compAttack();
    } while (isHit);
  };

  const onHumanShipSink = (squareCoord) => {
    const ship = getAttackedShip(human, squareCoord);
    if (ship.object.isSunk()) {
      comp.enemyShipSunk(ship);
    }
  };

  const onHumanTurn = (event) => {
    event.target.removeEventListener("click", onHumanTurn);
    const stringCoord = event.target.id.slice(event.target.id.length - 2);
    const coord = [Number(stringCoord[0]), Number(stringCoord[1])];
    const isHit = human.attack(comp, coord);
    if (isHit) {
      event.target.classList.add("hit");
      markAdjacentSquares(stringCoord);
      markOuterSquares(comp, coord);
      isWinner(false, comp);
    } else {
      event.target.classList.add("miss");
      onCompsTurn();
    }

    if (humanLastMove) {
      humanLastMove.classList.remove("active");
    }
    humanLastMove = event.target;
  };

  const generateHumanGrid = () => {
    const humanGridContainer = document.querySelector(".human-grid");
    const allShips = shipCoords(human);
    for (let i = 0; i < 100; i++) {
      const stringCoord = i.toString().padStart(2, 0);
      const uniqId = "hum" + stringCoord;
      let div = document.createElement("div");
      div.classList = "square " + placeShipsOnGrid(allShips, stringCoord);
      div.setAttribute("id", uniqId);
      humanGridContainer.appendChild(div);
    }
  };

  const generateCompGrid = () => {
    const compGridContainer = document.querySelector(".comp-grid");
    const grids = [];
    for (let i = 0; i < 100; i++) {
      const uniqId = "comp" + i.toString().padStart(2, 0);
      let button = document.createElement("button");
      button.classList = "square ";
      button.setAttribute("id", uniqId);
      button.addEventListener("click", onHumanTurn);
      compGridContainer.appendChild(button);
    }

    return grids;
  };

  return { init };
})();

export default game;

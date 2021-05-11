import Player from "./player";

const game = (() => {
  let human = Player(false);
  let comp = Player(true);

  const init = () => {
    generateHumanGrid();
    generateCompGrid();
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
    elem.removeEventListener("click", onHumanAttack);
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
    comp = Player(true);
    let resultsPar = document.querySelector(".results");
    resultsPar.textContent = "Your grid";
    document.querySelector("#comp-container").style.display = "block";
    document.querySelector(".btn-container").style.display = "none";
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
    }
  };

  const compAttack = () => {
    const isAHit = comp.attack(human);
    const shotCoord = [...human.board.shotCoords].slice(-1);
    const grid = document.querySelector("#hum" + shotCoord);
    if (isAHit) {
      grid.classList.add("hit");
      isWinner(true, human);
    } else {
      grid.classList.add("miss");
    }
  };

  const onHumanAttack = (event) => {
    const compShotCoords = comp.board.shotCoords.size;
    const stringCoord = event.target.id.slice(event.target.id.length - 2);
    const coord = [Number(stringCoord[0]), Number(stringCoord[1])];
    if (human.attack(comp, coord)) {
      event.target.classList.add("hit");
      markAdjacentSquares(stringCoord);
      markOuterSquares(comp, coord);
      isWinner(false, comp);
    } else {
      event.target.classList.add("miss");
    }
    if (comp.board.shotCoords.size === compShotCoords + 1) {
      compAttack();
    }
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
      button.addEventListener("click", onHumanAttack);
      compGridContainer.appendChild(button);
    }

    return grids;
  };

  return { init };
})();

export default game;

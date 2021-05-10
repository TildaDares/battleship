import Player from "./player";

const Game = (() => {
  let human = Player(false);
  let comp = Player(true);

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

  const placeShipsOnGrid = (allShipCoords, coord) => {
    if (allShipCoords.includes(coord)) {
      return "ship";
    }
    return "";
  };

  // const generateHumanGrid = () => {
  //   const humanGridContainer = document.querySelector(".human-grid");
  //   const allShips = shipCoords(human);
  //   for (let i = 0; i < 100; i++) {
  //     const stringCoord = i.toString().padStart(2, 0);
  //     const uniqId = "hum" + stringCoord;
  //     let div = document.createElement('div');
  //     div.classList = 'square '
  //     grids.push(
  //       <div
  //         className={"square " + placeShipsOnGrid(allShips, stringCoord)}
  //         key={uniqId}
  //         id={uniqId}
  //       ></div>
  //     );
  //   }
  // };
})();

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

  // const generateHumanGrid = () => {
  //   const humanGridContainer = document.querySelector(".human-grid");
  // };
})();

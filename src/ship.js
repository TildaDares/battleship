const Ship = (length) => {
  let hitCoords = [];
  const isSunk = () => length === hitCoords.length;

  const hit = (coord) => {
    hitCoords.push(coord);
  };

  return { length, isSunk, hit };
};

module.exports = Ship;

/**
 * Generates a 10x10 field with randomly placed ships.
 * Ships: 1 with length 4, 2 with length 3, 3 with length 2, 4 with length 1
 * Empty cells are represented as ""
 *
 * @returns A 10x10 array representing the field with randomly placed ships.
 */
export const generateRandomField = (): string[][] => {
  const field = Array(10)
    .fill(null)
    .map(() => Array(10).fill(""));

  const shipConfigs = [
    { length: 4, count: 1 },
    { length: 3, count: 2 },
    { length: 2, count: 3 },
    { length: 1, count: 4 },
  ];

  const directions = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
  ];

  let shipId = 0;

  const canPlaceShip = (
    x: number,
    y: number,
    length: number,
    dx: number,
    dy: number
  ): boolean => {
    for (let i = 0; i < length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;

      if (nx < 0 || ny < 0 || nx >= 10 || ny >= 10) return false;

      for (let adjX = nx - 1; adjX <= nx + 1; adjX++) {
        for (let adjY = ny - 1; adjY <= ny + 1; adjY++) {
          if (
            adjX >= 0 &&
            adjY >= 0 &&
            adjX < 10 &&
            adjY < 10 &&
            field[adjX][adjY] !== ""
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placeShip = (
    x: number,
    y: number,
    length: number,
    dx: number,
    dy: number,
    id: string
  ) => {
    for (let i = 0; i < length; i++) {
      field[x + i * dx][y + i * dy] = id;
    }
  };

  for (const config of shipConfigs) {
    for (let i = 0; i < config.count; i++) {
      const id = `S${config.length}_${shipId++}`;
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const { dx, dy } = directions[Math.floor(Math.random() * 2)];

        if (canPlaceShip(x, y, config.length, dx, dy)) {
          placeShip(x, y, config.length, dx, dy, id);
          placed = true;
        }
      }
    }
  }

  return field;
};

export const createEmptyField = (): string[][] => {
  return Array.from({ length: 10 }, () => Array(10).fill(""));
};

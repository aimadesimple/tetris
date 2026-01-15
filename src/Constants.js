export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30; // pixels

export const COLORS = [
  'transparent',
  'cyan',    // I
  'blue',    // J
  'orange',  // L
  'yellow',  // O
  'green',   // S
  'purple',  // T
  'red'      // Z
];

export const SHAPES = [
  [],
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],                        // J
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],                        // L
  [[4, 4], [4, 4]],                                         // O
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],                        // S
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],                        // T
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]                         // Z
];

export const KEY = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  SPACE: ' '
};

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
};

export const LEVEL_SPEED = [
  800, 720, 630, 550, 470, 380, 300, 220, 130, 100
];

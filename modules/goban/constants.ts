export const GAME = {
  BLACK: 'black',
  WHITE: 'white',
};

export const BOARD_PADDING_RATIO = 8;
export const COORDINAT_PADDING_RATIO = 15;

export const DIRECTIONS = [
  { dx: 0, dy: 1 }, // Yukarı
  { dx: 0, dy: -1 }, // Aşağı
  { dx: 1, dy: 0 }, // Sağ
  { dx: -1, dy: 0 }, // Sol
];


export const first19Letters = [...Array(19)].map((_, i) => String.fromCharCode(97 + i).toUpperCase());